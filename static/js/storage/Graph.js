class Graph {
  numberOfNodes = 0;
  adjacentList = {};
  constructor(initialData = null) {
    if (initialData !== null) {
      this.adjacentList = initialData.adjacentList;
      this.numberOfNodes = initialData.numberOfNodes;
    }
  }
  addVertex(VertexKey, nodeData) {
    this.adjacentList[VertexKey] = {
      currentNodeKey: VertexKey,
      parentNodeKey: null,
      ...nodeData,
    };
    this.numberOfNodes++;
  }
  addEdge(parentNode, childNode, coreColor) {
    this.adjacentList[childNode].parentNodeKey = parentNode;
    this.adjacentList[parentNode].childrenConnection[coreColor] = childNode;
    if (this.adjacentList[parentNode].connectionType !== 'mainLocal') {
      this.adjacentList[parentNode].totalCoreUsed++;
    }
  }

  getVertexByKey(vertexKey) {
    return this.adjacentList[vertexKey];
  }

  deleteVertex(vertexKey) {
    delete this.adjacentList[vertexKey];
    this.numberOfNodes--;
  }

  getAllVertices() {
    return Object.values(this.adjacentList);
  }
}

export default Graph;
