export default function (connection, map) {
  const { connectionName, connectionType, coordinates } = connection;

  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColo.find((item) => item.colorName === coreColor)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  polyline.setMap(map);

  console.log(connection, map);
}
