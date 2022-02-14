export default function (connection, map) {
  const {
    coordinates,
    connectionName,
    connectionType,
    totalCore,
    totalCodeUsed,
    childrenConnection,
  } = connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  polyline.setMap(map);

  const infoWindow = new google.maps.InfoWindow({
    content: `
    <p class="mb-1 fw-bold">${connectionName}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
    <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${totalCodeUsed}/${totalCore}</p>
    <p class="mb-1 fw-bold">Core Available: </p>
    <hr class="my-1 w-50" />
      ${(() => {
        let string = '';
        for (let color in childrenConnection) {
          string += `<p class="mb-1">${color} : ${
            childrenConnection[color] == null ? 'available' : 'used'
          }</p>`;
        }
        return string;
      })()}
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
