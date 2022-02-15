import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  console.log(connection);
  const {
    connectionName,
    connectionType,
    coordinates,
    coreColor,
    portNo,
    switchType,
    totalConnectionUsed,
    totalConnection,
  } = connection;

  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === coreColor)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `    <p class="mb-1 fw-bold">${connectionName}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
    <p class="mb-1"><span class="fw-bold">Core Color:</span> ${coreColor}</p>
    <p class="mb-1"><span class="fw-bold">Port No:</span> ${portNo}</p>
    <p class="mb-1"><span class="fw-bold"> Switch Type:</span> ${switchType}</p>
    <p class="mb-1"><span class="fw-bold"> total Connection Used:</span> ${totalConnectionUsed}/${totalConnection}</p>
    <p class="mb-1"><span class="fw-bold"> oldSwitchNumber:</span> ${switchType}</p>
    `,
  });

  google.maps.event.addListener(polyline, 'click', function (event) {
    window.selectPolyline(event.latLng, currentNodeKey);
  });

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });

  polyline.setMap(map);

  console.log(connection, map);
}
