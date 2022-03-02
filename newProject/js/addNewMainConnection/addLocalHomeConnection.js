import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
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

  const connectedPortNo = (function findPortNo(polylineVertex) {
    if (polylineVertex.portNo !== undefined) return polylineVertex.portNo;
    return findPortNo(graph.getVertexByKey(polylineVertex.parentNodeKey));
  })(graph.getVertexByKey(polylineKey));

  parentOlt.childrenConnection[connectedPortNo].connectionUsed++;
  parentOlt.totalConnectionUsed++;

  graph.addVertex(uuid, newLocalConnection);
  graph.addEdge(polylineKey, uuid, coreOption);
  console.log(graph);
  // localStorage.setItem('siteData', JSON.stringify(graph));
  // location.reload();
};
