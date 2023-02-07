export default function (connection, map, index) {
  const { _id, name, locations, type, totalCore, totalConnected, markers, childrens, mainLocalFiber } = connection;

  const coordinates = locations.coordinates.map((item) => ({ lat: item[0], lng: item[1] }));
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: "#142F43",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });
  window.allTheConnection[index].polyline = polyline;

  const lengthInMeters = google.maps.geometry.spherical.computeLength(polyline.getPath());
  let localFiberChildrens = "";

  (mainLocalFiber?.childrens || childrens).forEach((item) => {
    localFiberChildrens += item.connectionType === "splitter" ? `<p class="mb-1">${item.color}: used </p>` : "";
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
    <p class="mb-1 fw-bold">${name}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${type}</p>
    <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${
      mainLocalFiber?.totalConnected || totalConnected
    }/${mainLocalFiber?.totalCore || totalCore}</p>
    <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(lengthInMeters)}m</p>
    <button class="badge mb-1 bg-danger border-0" onclick="deleteConnection('${type}', '${_id}', '${
      location._id
    }')">Delete</button>
      <p class="mb-1 fw-bold">Core Available: </p>
      <hr class="my-1 w-50" />
      ${localFiberChildrens}
      `,
  });

  polyline.addListener("mouseover", (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener("mouseout", () => {
    infoWindow.close();
  });

  google.maps.event.addListener(polyline, "click", (event) => {
    window.selectPolyline(event.latLng, { _id, type });
  });

  polyline.setMap(map);

  window.allTheConnection[index].markersPoint = [];

  markers.forEach(({ coordinates }) => {
    // printing tj box on the map
    const icon = {
      url: "../../../assets/img/tj.png",
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 15),
    };

    const marker = new google.maps.Marker({
      position: {
        lat: coordinates[1],
        lng: coordinates[0],
      },
      map,
      icon,
    });
    google.maps.event.addListener(marker, "click", (event) => {
      window.selectPolyline(event.latLng, { _id, type });
    });
    window.allTheConnection[index].markersPoint.push(marker);
  });
}
