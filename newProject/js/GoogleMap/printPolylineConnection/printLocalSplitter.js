import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  const {
    currentNodeKey,
    coordinates,
    connectionName,
    connectionType,
    totalConnection,
    totalCoreUsed,
    childrenConnection,
    connectedWith,
    portNo,
    localSplitterType,
    CoreColor,
  } = connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: CoreColor
      ? allTheCoreColor.find((item) => item.colorName === CoreColor)?.colorCode
      : '#524A4E',
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
      <p class="mb-1"><span class="fw-bold">Connected with:</span> ${connectedWith}</p>
      <p class="mb-1"><span class="fw-bold">Splitter Type:</span> ${localSplitterType}</p>
      <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
${
  portNo
    ? `<p class='mb-1'>
    <span class='fw-bold'>Port No:</span> ${portNo}
  </p>`
    : `<p class='mb-1'>
    <span class='fw-bold'>Connected Core Color:</span> ${CoreColor}
  </p>`
} 
       <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${totalCoreUsed}/${totalConnection}</p>
      <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(
        lengthInMeters
      )}m</p>
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

  // const endPoint = new google.maps.Circle({
  //   strokeColor: '#364F6B',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#142F43',
  //   fillOpacity: 1,
  //   map,
  //   center: coordinates[coordinates.length - 1],
  //   radius: 30,
  // });

  // google.maps.event.addListener(endPoint, 'click', function (event) {
  //   window.selectPolyline(event.latLng, currentNodeKey);
  // });

  const icon = {
    url: '../../../assets/img/splitter.png',
    scaledSize: new google.maps.Size(30, 30),
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

  google.maps.event.addListener(marker, 'click', function (event) {
    window.selectPolyline(event.latLng, currentNodeKey);
  });
}
