import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  const { companyName, coordinates, connectionType, portNo, coreColor } =
    connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === coreColor)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  polyline.setMap(map);

  const lengthInMeters = google.maps.geometry.spherical.computeLength(
    polyline.getPath()
  );

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <p class="mb-1 fw-bold">${companyName}</p>
      <hr class="my-1" />
      <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
      <p class="mb-1"><span class="fw-bold">Port No:</span> ${portNo}</p>
      <p class="mb-1"><span class="fw-bold">Core Color:</span> ${coreColor}</p>
      <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(
        lengthInMeters
      )}m</p>
      `,
  });

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });
}
