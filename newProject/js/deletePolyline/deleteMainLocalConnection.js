import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);
  const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);

  parentVertex.childrenConnection[targetVertex.coreColor] = null;
  graph.deleteVertex(primaryKey);
  parentVertex.totalCoreUsed--;

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
