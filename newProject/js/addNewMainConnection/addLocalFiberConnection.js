import Graph from '../storage/Graph.js';
import coreColor from '../utility/coreColor.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById(
    'addLocalFiberConnectionName'
  ).value;

  const connectionTotalCore = Number(
    document.getElementById('addLocalFiberConnectionCoreOptions').value
  );

  const selectedCoreColor = coreColor.slice(0, connectionTotalCore);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });

  const localFiberConnection = {
    connectionName,
    connectionType: 'localFiberConnection',
    totalCore: connectionTotalCore,
    totalCoreUsed: 0,
    coordinates,
    childrenConnection: connectionCoreColor,
  };

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);

  const uuid = uuidv4();

  graph.addVertex(uuid, localFiberConnection);
  graph.addEdge(polylineKey, uuid, connectionTotalCore);

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
