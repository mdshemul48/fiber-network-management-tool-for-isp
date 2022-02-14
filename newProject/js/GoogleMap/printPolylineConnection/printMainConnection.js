export default function (connection, map) {
  const { coordinates } = connection;
  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  polyline.setMap(map);

  const infoWindow = new google.maps.InfoWindow({
    content: `hello world`,
  });

  polyline.addListener('mouseover', (event) => {
    infoWindow.setPosition(event.latLng);
    infoWindow.open(map);
  });

  polyline.addListener('mouseout', () => {
    infoWindow.close();
  });
}
