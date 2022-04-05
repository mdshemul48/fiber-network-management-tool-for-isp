import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map, index) {
  const {
    _id,
    parent,
    name,
    type,
    portNo,
    oltType,
    oltSerialNumber,
    color,
    connectionLimit,
    location,
    childrens,
    connectionUsed,
  } = connection;

  const coordinates = location.coordinates.map((item) => {
    return { lat: item[0], lng: item[1] };
  });
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === color)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 4,
  });

  window.allTheConnection[index].polyline = polyline;

  let resellerChildDetail = '';
  childrens.forEach((child) => {
    if (child.connectionType === 'splitter') {
      resellerChildDetail += `<p class="mb-1">Port: ${child.portNo}: ${child.connectionUsed}/${connectionLimit}</p>`;
    }
  });
  const infoWindow = new google.maps.InfoWindow({
    content: `<p class="mb-1 fw-bold">${name}</p>
    <hr class="my-1" />
    <p class="mb-1"><span class="fw-bold">Connection Type:</span> ${type}</p>
    <p class="mb-1"><span class="fw-bold">Core Color:</span> ${color}</p>
    <p class="mb-1"><span class="fw-bold">Port No:</span> ${portNo}</p>
    <p class="mb-1"><span class="fw-bold"> Olt Type:</span> ${oltType}</p>
    <p class="mb-1"><span class="fw-bold"> total Connection Used:</span> ${connectionUsed}</p>
    
    <p class="mb-1"><span class="fw-bold"> oltSwitchNumber:</span> ${oltSerialNumber}</p>
    <button class="badge mb-1 bg-danger border-0" onclick="deleteConnection('${type}', '${_id}')">Delete</button>

    <p class="mb-1 fw-bold">Port Used: </p>
    <hr class="my-1 w-50" />
    ${resellerChildDetail}
    `,
  });

  google.maps.event.addListener(polyline, 'click', function (event) {
    window.selectPolyline(event.latLng, { _id, type });
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

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  window.allTheConnection[index].markersPoint = [marker];

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });
  google.maps.event.addListener(marker, 'click', function (event) {
    window.selectPolyline(event.latLng, { _id, type });
  });
}
