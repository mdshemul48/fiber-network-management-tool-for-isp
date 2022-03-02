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

    if (graph.getVertexByKey(polylineKey).connectionType !== 'mainLocal') {
      newSplitterConnection.CoreColor = connectedCoreColor;
      graph.addVertex(uuid, newSplitterConnection);
      graph.addEdge(polylineKey, uuid, connectedCoreColor);
      newSplitterConnection.CoreColor = connectedCoreColor;

      // updating all the parent about this line

      (function findMainLocalLine(parentKey, uuid, connectedCoreColor) {
        const parentNode = graph.getVertexByKey(parentKey);
        if (parentNode.connectionType === 'mainLocal') {
          graph.adjacentList[parentKey].childrenConnection[
            localSplitterPortNo
          ] = { childID: uuid, connectionType: 'splitter', connectionUsed: 0 };
          return;
        }
        parentNode.childrenConnection[connectedCoreColor] = uuid;
        parentNode.totalCoreUsed++;
        return findMainLocalLine(
          parentNode.parentNodeKey,
          uuid,
          connectedCoreColor
        );
      })(
        graph.getVertexByKey(polylineKey).parentNodeKey,
        uuid,
        connectedCoreColor
      );
    } else {
      newSplitterConnection.parentNodeKey = polylineKey;
      graph.addVertex(uuid, newSplitterConnection);

      graph.adjacentList[polylineKey].childrenConnection[localSplitterPortNo] =
        {
          childID: uuid,
          connectionType: 'splitter',
          connectionUsed: 0,
        };
    }
  } else {
    newSplitterConnection.CoreColor = connectedCoreColor;
    graph.addVertex(uuid, newSplitterConnection);
    graph.addEdge(polylineKey, uuid, connectedCoreColor);
  }
  console.log(graph);
  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
