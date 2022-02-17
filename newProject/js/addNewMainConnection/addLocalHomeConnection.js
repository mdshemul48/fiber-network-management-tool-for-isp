import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
  console.log(polylineKey, coordinates);
  const connectionName = document.getElementById(
    'addLocalHomeConnectionName'
  ).value;
  const OnuNo = document.getElementById('addLocalHomeConnectionOnuNo').value;
  const coreOption = document.getElementById(
    'addLocalHomeConnectionOptions'
  ).value;

  const newLocalConnection = {
    connectionName,
    connectionType: 'localHome',
    coordinates,
    OnuNo,
    CoreColor: coreOption,
  };

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);
  const uuid = uuidv4();

  const parentOlt = (function parentOlt(node) {
    if (node.connectionType === 'mainLocal') return node;
    else return parentOlt(graph.adjacentList[node.parentNodeKey]);
  })(graph.adjacentList[polylineKey]);

  parentOlt.totalConnectionUsed++;

  graph.addVertex(uuid, newLocalConnection);
  graph.addEdge(polylineKey, uuid, coreOption);
  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
