import allTheCoreColor from '../../utility/coreColor.js';

export default function (connection, map) {
  console.log(connection);
  const { connectionName, connectionType, coordinates, coreColor } = connection;

  const polyline = new google.maps.Polyline({
    path: coordinates,
    geodesic: true,
    strokeColor: allTheCoreColor.find((item) => item.colorName === coreColor)
      .colorCode,
    strokeOpacity: 1.0,
    strokeWeight: 3,
  });

  polyline.setMap(map);

  console.log(connection, map);
}
