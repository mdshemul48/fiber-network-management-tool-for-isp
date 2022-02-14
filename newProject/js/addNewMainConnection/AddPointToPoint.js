import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
  const companyName = document.getElementById(
    'addPointToPointCompanyName'
  ).value;
  const portNo = document.getElementById('addPointToPointPortNo').value;
  const coreColor = document.getElementById('addPointToPointCoreOptions').value;

  const pointToPointPolyline = {
    companyName,
    connectionType: 'PointToPoint',
    portNo,
    coreColor,
    coordinates,
  };
  console.log(pointToPointPolyline);

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);

  const uuid = uuidv4();

  console.log(polylineKey, uuid, coreColor, 'this is good');

  graph.addVertex(uuid, pointToPointPolyline);
  graph.addEdge(polylineKey, uuid, coreColor);
  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
