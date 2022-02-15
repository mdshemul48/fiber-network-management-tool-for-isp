import Graph from '../storage/Graph.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalConnectionName'
  ).value;
  const oltSwitchNumber = document.getElementById(
    'addLocalConnectionOltSwitchNo'
  ).value;

  const portNo = document.getElementById('addLocalConnectionPortNo').value;

  const connectionType = document.querySelector(
    'input[name="addLocalConnectionType"]:checked'
  ).value;

  const coreColor = document.getElementById(
    'addLocalConnectionCoreOption'
  ).value;

  const newConnection = {
    connectionName,
    oltSwitchNumber,
    portNo,
    connectionType: 'mainLocal',
    switchType: connectionType,
    coordinates,
    coreColor,
    totalConnection: connectionType === 'epon' ? 64 : 128,
    childrenConnection: {},
    totalConnectionUsed: 0,
  };

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);
  const uuid = uuidv4();
  graph.addVertex(uuid, newConnection);
  graph.addEdge(polylineKey, uuid, coreColor);
  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
