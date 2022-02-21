import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);
  const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);
  console.log(targetVertex, parentVertex);

  if (targetVertex.connectedWith === 'LocalSplitter') {
    parentVertex.totalCoreUsed--;
    parentVertex.childrenConnection[targetVertex.CoreColor] = null;
    graph.deleteVertex(primaryKey);
  } else {
  }
  console.log(parentVertex);
};
