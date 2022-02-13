class Graph {
  numberOfNodes = 0;
  adjacentList = {};
  constructor(initialData = null) {
    console.log('this is the graph constructor', initialData);
    if (initialData !== null) {
      this.adjacentList = initialData.adjacentList;
      this.numberOfNodes = initialData.numberOfNodes;
    }
  }
  addVertex(VertexKey, nodeData) {
    this.adjacentList[VertexKey] = {
      currentNode: VertexKey,
      prevNode: null,
      ...nodeData,
    };
    this.numberOfNodes++;
  }
  addEdge(node1, node2) {
    this.adjacentList[node2].prevNode = node1;
    this.adjacentList[node1].children.push(node2);
  }
  showConnections() {
    const allNodes = Object.keys(this.adjacentList);
    for (let node of allNodes) {
      let nodeConnections = this.adjacentList[node];
      let connections = '';
      let vertex;
      for (vertex of nodeConnections.children) {
        connections += vertex + ' ';
      }
      console.log(node + '-->' + connections);
    }
  }
  getVertexByKey(vertexKey) {
    return this.adjacentList[vertexKey];
  }

  deleteVertex(vertexKey) {
    const currentNode = this.adjacentList[vertexKey];
    const { prevNode: prevNodeKey } = currentNode;
    if (currentNode.prevNode !== null) {
      const filtered = this.adjacentList[prevNodeKey].children.filter(
        (currentKey) => {
          return currentKey !== vertexKey;
        }
      );
      this.adjacentList[prevNodeKey].children = filtered;
    }

    delete this.adjacentList[vertexKey];
    this.numberOfNodes--;
  }

  getAllVertices() {
    return Object.values(this.adjacentList);
  }
}

export default Graph;
