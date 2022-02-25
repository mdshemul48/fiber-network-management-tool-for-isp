import Graph from '../../storage/Graph.js';

export default function (connection, map) {
  const {
    currentNodeKey,
    coordinates,
    connectionName,
    connectionType,
    totalCore,
    totalCoreUsed,
    childrenConnection,
  } = connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: '#142F43',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  const lengthInMeters = google.maps.geometry.spherical.computeLength(
    polyline.getPath()
  );

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <p class="mb-1 fw-bold">${connectionName}</p>
      <hr class="my-1" />
      <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${connectionType}</p>
       <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${totalCoreUsed}/${totalCore}</p>
      <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(
        lengthInMeters
      )}m</p>
      <p class="mb-1 fw-bold">Core Available: </p>
      <button class="badge mb-1 bg-danger border-0" onclick="deleteSplitterConnection('${currentNodeKey}')">Delete</button>
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

  google.maps.event.addListener(polyline, 'click', function (event) {
    window.selectPolyline(event.latLng, currentNodeKey);
  });

  // printing tj box on the map

  const icon = {
    url: '../../../assets/img/tj.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
  };

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);

  const allTheConnection = Object.values(childrenConnection);
  const tjBoxAdded = {};
  allTheConnection.forEach((item) => {
    if (
      item != null &&
      !tjBoxAdded[graph.getVertexByKey(item)?.coordinates[0]['lat']]
    ) {
      const marker = new google.maps.Marker({
        position: graph.getVertexByKey(item).coordinates[0],
        map,
        icon,
      });

      google.maps.event.addListener(marker, 'click', function (event) {
        window.selectPolyline(event.latLng, currentNodeKey);
      });
      tjBoxAdded[graph.getVertexByKey(item).coordinates[0]['lat']] = true;
    }
  });

  polyline.setMap(map);
}
