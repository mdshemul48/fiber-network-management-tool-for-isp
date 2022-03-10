import Graph from '../../storage/Graph.js';

export default function (connection, map) {
  const { _id, name, locations, type, totalCore, totalConnected, markers } =
    connection;

  locations.forEach((location) => {
    const coordinates = location.coordinates.map((item) => {
      return { lat: item[0], lng: item[1] };
    });

    const polyline = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#142F43',
      strokeOpacity: 1.0,
      strokeWeight: 4,
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
        <button class="badge mb-1 bg-danger border-0" onclick="deleteSplitterConnection('${_id}', '${
        location._id
      }')">Delete</button>
        <p class="mb-1 fw-bold">Core Available: </p>
        <hr class="my-1 w-50" />
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
      window.selectPolyline(event.latLng, { _id, type });
    });

    polyline.setMap(map);
  });

  markers.forEach((location) => {
    console.log(location);
    // printing tj box on the map

    const icon = {
      url: '../../../assets/img/tj.png',
      scaledSize: new google.maps.Size(30, 30),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 15),
    };
  });
}
