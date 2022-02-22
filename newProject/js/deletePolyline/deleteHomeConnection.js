import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);
  const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);

  console.log(targetVertex, parentVertex);

  parentVertex.childrenConnection[targetVertex.CoreColor] = null;
  graph.deleteVertex(primaryKey);

  parentVertex.totalCoreUsed--;

  // deleting connection from olt
  const parentOlt = (function parentOlt(node) {
    if (node.connectionType === 'mainLocal') return node;
    else return parentOlt(graph.getVertexByKey(node.parentNodeKey));
  })(graph.getVertexByKey(targetVertex.parentNodeKey));

  parentOlt.totalConnectionUsed--;

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
