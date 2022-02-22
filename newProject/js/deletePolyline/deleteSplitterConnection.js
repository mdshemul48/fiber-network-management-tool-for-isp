import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);
  const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);

  if (targetVertex.connectedWith === 'LocalSplitter') {
    parentVertex.totalCoreUsed--;
    parentVertex.childrenConnection[targetVertex.CoreColor] = null;
  } else if (targetVertex.connectedWith === 'olt') {
    delete parentVertex.childrenConnection[targetVertex.portNo];
  }
  graph.deleteVertex(primaryKey);

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
