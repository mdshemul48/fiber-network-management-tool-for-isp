import coreColor from '../utility/coreColor.js';

export default function (connection, map, index) {
  const {
    name,
    location,
    totalCore,
    totalConnected,
    type,
    childrens,
    _id,
    markers,
  } = connection;
  const polyline = new google.maps.Polyline({
    path: location.coordinates.map((item) => {
      return { lng: item[0], lat: item[1] };
    }),
    geodesic: true,
    strokeColor: '#142F43',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  polyline.setMap(map);

  window.allTheConnection[index].polyline = polyline;

  const colorCores = coreColor.slice(0, totalCore);

  let coreUsed = '';
  colorCores.forEach((item) => {
    const targetColor = childrens.find(
      (child) => child.color === item.colorName
    );
    if (targetColor) {
      coreUsed += `
        <p class="mb-1">${item.colorName} : used (Port: ${targetColor.portNo})</p>
        `;
    } else {
      coreUsed += `
        <p class="mb-1">${item.colorName} : available</p>
        `;
    }
  });

  const lengthInMeters = google.maps.geometry.spherical.computeLength(
    polyline.getPath()
  );

  const infoWindow = new google.maps.InfoWindow({
    content: `
    <p class="mb-1 fw-bold">${name}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${type}</p>
    <p class="mb-1"><span class=" fw-bold">total Used Core:</span> ${totalConnected}/${totalCore}</p>
    <p class="mb-1"><span class=" fw-bold">Distance:</span> ${Math.ceil(
      lengthInMeters
    )}m</p>
    <button class="badge mb-1 bg-danger border-0" onclick="deleteConnection('${type}', '${_id}')">Delete</button>
    <p class="mb-1 fw-bold">Core Available: </p>
    <hr class="my-1 w-50" />
    ${coreUsed}
    `,
  });

  google.maps.event.addListener(polyline, 'click', function (event) {
    window.selectPolyline(event.latLng, { _id, type });
  });

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });

  // printing tj box on the map

  const icon = {
    url: '../../../assets/img/tj.png',
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(15, 15),
  };
  window.allTheConnection[index].markersPoint = [];
  markers.forEach((item) => {
    const [lat, lng] = item.location.coordinates;
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map,
      icon,
    });
    google.maps.event.addListener(marker, 'click', function (event) {
      window.selectPolyline(event.latLng, { _id, type });
    });
    window.allTheConnection[index].markersPoint.push(marker);
  });
}
