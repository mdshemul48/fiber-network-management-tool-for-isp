import allTheCoreColor from "../utility/coreColor.js";

export default function (connection, map, index) {
  const { _id, name, parentType, color, location, splitterLimit, splitterUsed, portNo, type, childrens } = connection;

  const coordinates = location.coordinates.map((item) => ({ lng: item[0], lat: item[1] }));
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: color ? allTheCoreColor.find((item) => item.colorName === color)?.colorCode : "#24A19C",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  window.allTheConnection[index].polyline = polyline;

  connection.obj = polyline;

  const lengthInMeters = google.maps.geometry.spherical.computeLength(polyline.getPath());

  // splitter details
  let splitterChildDetails = "";

  childrens.forEach((item) => {
    splitterChildDetails += `<p class="mb-1">${item.color}: ${item.connectionType} </p>`;
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <p class="mb-1 fw-bold">${name}</p>
      <hr class="my-1" />
      <p class="mb-1"><span class="fw-bold">Connected with:</span> ${parentType}</p>
      <p class="mb-1"><span class="fw-bold">Splitter Type:</span> ${1} is to ${splitterLimit}</p>
      <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${type}</p>
${
  portNo
    ? `<p class='mb-1'>
    <span class='fw-bold'>Port No:</span> ${portNo}
  </p>`
    : ""
} 
      ${
        color
          ? `<p class='mb-1'>
      <span class='fw-bold'>Connected Core Color:</span> ${color}
    </p>`
          : ""
      }
       <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${splitterUsed}/${splitterLimit}</p>
      <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(lengthInMeters)}m</p>
      <p class="mb-1 fw-bold">Core Available: </p>
      <button class="badge mb-1 bg-danger border-0" onclick="deleteConnection('${type}', '${_id}')">Delete</button>
      <hr class="my-1 w-50" />
      ${splitterChildDetails}
      `,
  });

  const icon = {
    url: "../../../assets/img/splitter.png",
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
  };

  const marker = new google.maps.Marker({
    position: coordinates[coordinates.length - 1],
    map,
    icon,
  });
  window.allTheConnection[index].markersPoint = [marker];

  polyline.addListener("mouseover", (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener("mouseout", () => {
    infoWindow.close();
  });

  google.maps.event.addListener(marker, "click", (event) => {
    window.selectPolyline(event.latLng, { _id, type });
  });
  polyline.setMap(map);
}
