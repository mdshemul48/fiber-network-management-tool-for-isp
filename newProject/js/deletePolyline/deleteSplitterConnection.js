import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);

  if (targetVertex.connectedWith === 'LocalSplitter') {
    const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);
    parentVertex.totalCoreUsed--;
    parentVertex.childrenConnection[targetVertex.CoreColor] = null;
  } else if (targetVertex.connectedWith === 'olt') {
    const parentOlt = (function parentOlt(node) {
      if (node.connectionType === 'mainLocal') return node;
      else return parentOlt(graph.adjacentList[node.parentNodeKey]);
    })(graph.adjacentList[targetVertex.parentNodeKey]);

    delete parentOlt.childrenConnection[targetVertex.portNo];

    if (
      graph.getVertexByKey(targetVertex.parentNodeKey).connectionType !==
      'mainLocal'
    ) {
      graph.getVertexByKey(targetVertex.parentNodeKey)[targetVertex.CoreColor] =
        null;
    }
  }
  graph.deleteVertex(primaryKey);

  localStorage.setItem('siteData', JSON.stringify(graph));
  location.reload();
};
