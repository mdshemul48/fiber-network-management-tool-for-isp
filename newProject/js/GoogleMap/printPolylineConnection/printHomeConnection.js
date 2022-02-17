import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  console.log(connection);
  const { coordinates, connectionName, OnuNo, CoreColor, connectionType } =
    connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === CoreColor)
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
        <p class="mb-1 fw-bold">${connectionName}</p>
        <hr class="my-1" />
        <p class="mb-1"><span class="fw-bold">Onu No:</span> ${OnuNo}</p>
        <p class="mb-1"><span class="fw-bold">connection Type:</span> ${connectionType}</p>
        <p class="mb-1"><span class="fw-bold">Core Color:</span> ${CoreColor}</p>
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
