import Graph from '../storage/Graph.js';

export default (primaryKey) => {
  const savedData = JSON.parse(localStorage.getItem('siteData'));
  const graph = new Graph(savedData);

  // deleting from splitter

  const targetVertex = graph.getVertexByKey(primaryKey);

  if (targetVertex.connectedWith === 'LocalSplitter') {
    const parentVertex = graph.getVertexByKey(targetVertex.parentNodeKey);
  } else if (targetVertex.connectedWith === 'olt') {
    // deleting from olt and parent connection
    (function parentOlt(node) {
      if (node.connectionType === 'mainLocal') {
        delete node.childrenConnection[targetVertex.portNo];
        return;
      }
      if (node.connectionType === 'localFiberConnection') {
        node.totalCoreUsed--;
        node.childrenConnection[targetVertex.CoreColor] = null;
      }

      parentOlt(graph.getVertexByKey(node.parentNodeKey));
    })(graph.getVertexByKey(targetVertex.parentNodeKey));
    console.log(graph.getVertexByKey(targetVertex.parentNodeKey));
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
