import allTheCoreColor from '../utility/coreColor.js';
export default function (connection, map, index) {
  const { name, color, onuNo, type, locations, _id } = connection;

  const coordinates = locations.coordinates.map((item) => ({ lat: item[0], lng: item[1] }));

  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === color)
      ?.colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  window.allTheConnection[index].polyline = polyline;

  polyline.setMap(map);

  const lengthInMeters = google.maps.geometry.spherical.computeLength(
    polyline.getPath()
  );

  const infoWindow = new google.maps.InfoWindow({
    content: `
        <p class="mb-1 fw-bold">${name}</p>
        <hr class="my-1" />
        <p class="mb-1"><span class="fw-bold">Onu No:</span> ${onuNo}</p>
        <p class="mb-1"><span class="fw-bold">connection Type:</span> ${type}</p>
        <p class="mb-1"><span class="fw-bold">Core Color:</span> ${color}</p>
        <p class="mb-1"><span class="fw-bold">Distance:</span> ${Math.ceil(
          lengthInMeters
        )}m</p>
        <button class="badge mb-1 bg-danger border-0" onclick="deleteConnection('${type}', '${_id}')">Delete</button>
        `,
  });

  const icon = {
    url: '../../../assets/img/onu.png',
    scaledSize: new google.maps.Size(35, 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
  };

  const marker = new google.maps.Marker({
    position: coordinates[coordinates.length - 1],
    map,
    icon: icon,
  });

  // marker.addListener('mouseover', (event) => {
  //   infoWindow.setPosition(event.latLng);
  //   infoWindow.open(map);
  // });

  // marker.addListener('mouseout', () => {
  //   infoWindow.close();
  // });

  window.allTheConnection[index].markersPoint = [marker];

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });
  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });
}
