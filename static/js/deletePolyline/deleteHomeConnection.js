import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);
  const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);

  parentVertex.childrenConnection[targetVertex.CoreColor] = null;

  parentVertex.totalCoreUsed--;

  // deleting connection from olt
  const parentOlt = (function parentOlt(node) {
    if (node.connectionType === 'mainLocal') return node;
    else return parentOlt(graph.getVertexByKey(node.parentNodeKey));
  })(graph.getVertexByKey(targetVertex.parentNodeKey));

  const connectedPortNo = (function findPortNo(polylineVertex) {
    if (polylineVertex.portNo !== undefined) return polylineVertex.portNo;
    return findPortNo(graph.getVertexByKey(polylineVertex.parentNodeKey));
  })(graph.getVertexByKey(primaryKey));

  parentOlt.childrenConnection[connectedPortNo].connectionUsed--;
  parentOlt.totalConnectionUsed--;

  graph.deleteVertex(primaryKey);
  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
