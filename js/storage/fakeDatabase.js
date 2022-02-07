import Graph from './Graph.js';
import uuidv4 from '../util/uuid.js';

class Database {
  storage = null;
  constructor() {
    this.storage = new Graph();
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
  }
}

export default Database;
