import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  const {
    currentNodeKey,
    connectionName,
    connectionType,
    coordinates,
    coreColor,
    portNo,
    switchType,
    totalConnectionUsed,
    totalConnection,
    oltSwitchNumber,
    childrenConnection,
  } = connection;

  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === coreColor)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `    <p class="mb-1 fw-bold">${connectionName}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
    <p class="mb-1"><span class="fw-bold">Core Color:</span> ${coreColor}</p>
    <p class="mb-1"><span class="fw-bold">Port No:</span> ${portNo}</p>
    <p class="mb-1"><span class="fw-bold"> Switch Type:</span> ${switchType}</p>
    <p class="mb-1"><span class="fw-bold"> total Connection Used:</span> ${totalConnectionUsed}</p>
    
    <p class="mb-1"><span class="fw-bold"> oltSwitchNumber:</span> ${oltSwitchNumber}</p>
    <button class="badge mb-1 bg-danger border-0" onclick="deleteMainLocalConnection('${currentNodeKey}')">Delete</button>

    <p class="mb-1 fw-bold">Port Used: </p>
    <hr class="my-1 w-50" />
    ${(() => {
      let string = '';
      for (let color in childrenConnection) {
        const { childID, connectionType, connectionUsed } =
          childrenConnection[color];
        string += `<p class="mb-1">${color} : ${
          childrenConnection[color] == null
            ? 'available'
            : `${connectionUsed}/${totalConnection}`
        }</p>`;
      }
      return string;
    })()}
    `,
  });

  google.maps.event.addListener(polyline, 'click', function (event) {
    window.selectPolyline(event.latLng, currentNodeKey);
  });

  polyline.setMap(map);

  const icon = {
    url: '../../../assets/img/olt.png',
    scaledSize: new google.maps.Size(35, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
  };

  const marker = new google.maps.Marker({
    position: coordinates[coordinates.length - 1],
    map,
    icon: icon,
  });

  marker.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  marker.addListener('mouseout', () => {
    infoWindow.close();
  });

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });
  google.maps.event.addListener(marker, 'click', function (event) {
    window.selectPolyline(event.latLng, currentNodeKey);
  });
}
