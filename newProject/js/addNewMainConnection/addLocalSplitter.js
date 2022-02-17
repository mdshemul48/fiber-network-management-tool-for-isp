import Graph from '../storage/Graph.js';
import coreColor from '../utility/coreColor.js';
import uuidv4 from '../utility/uuid.js';

export default (polylineKey, coordinates) => {
  const connectionName = document.getElementById('addLocalSplitterName').value;
  const localSplitterPortNo = Number(
    document.getElementById('addLocalSplitterPortNo').value
  );
  const localSplitterType = Number(
    document.getElementById('addLocalSplitterType').value
  );
  const connectedWith = document.querySelector(
    'input[name="addLocalSplitterConnectedWith"]:checked'
  ).value;

  const connectedCoreColor = document.getElementById(
    'addLocalSplitterConnection'
  ).value;

  const selectedCoreColor = coreColor.slice(0, localSplitterType);

  const connectionCoreColor = {};
  selectedCoreColor.forEach((item) => {
    connectionCoreColor[item.colorName] = null;
  });

  const newSplitterConnection = {
    connectionName,
    connectionType: 'localSplitter',
    coordinates,
    localSplitterType: '1/' + localSplitterType,
    connectedWith,
    childrenConnection: connectionCoreColor,
    totalConnection: localSplitterType,
    totalCoreUsed: 0,
  };

  const graph = new Graph(JSON.parse(localStorage.getItem('siteData')) || null);

  const uuid = uuidv4();

  if (connectedWith === 'olt') {
    newSplitterConnection.portNo = localSplitterPortNo;
    graph.addVertex(uuid, newSplitterConnection);
    graph.addEdge(polylineKey, uuid, localSplitterPortNo);
  } else {
    newSplitterConnection.CoreColor = connectedCoreColor;
    graph.addVertex(uuid, newSplitterConnection);
    graph.addEdge(polylineKey, uuid, connectedCoreColor);
  }
  console.log(graph);

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
