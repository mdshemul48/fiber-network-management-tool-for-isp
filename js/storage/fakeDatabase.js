import Graph from './Graph.js';
import uuidv4 from '../util/uuid.js';
class Database {
  storage = null;
  constructor() {
    const savedData = JSON.parse(localStorage.getItem('siteData'));
    this.storage = new Graph(savedData);
  }

  addPointToPoint(id, polylineInfo) {
    if (id) {
      const uniqueId = uuidv4();
      this.storage.addVertex(uniqueId, polylineInfo);
      this.storage.addEdge(id, uniqueId);
    } else {
      const uniqueId = uuidv4();
      this.storage.addVertex(uniqueId, polylineInfo);
    }
    const graphData = JSON.stringify(this.storage);
    localStorage.setItem('siteData', graphData);
  }
}

export default Database;
