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
    // const currentNode = this.adjacentList[vertexKey];
    // const { prevNode: prevNodeKey } = currentNode;
    // if (currentNode.prevNode !== null) {
    //   console.log(this.adjacentList[prevNodeKey].childrenConnection);
    //   const filtered = this.adjacentList[prevNodeKey].childrenConnection.filter(
    //     (currentKey) => {
    //       return currentKey !== vertexKey;
    //     }
    //   );
    //   this.adjacentList[prevNodeKey].childrenConnection = filtered;
    // }
    delete this.adjacentList[vertexKey];
    this.numberOfNodes--;
  }

  getAllVertices() {
    return Object.values(this.adjacentList);
  }
}

export default Graph;
