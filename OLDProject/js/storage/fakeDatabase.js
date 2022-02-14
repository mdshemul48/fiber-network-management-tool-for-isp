import Graph from './Graph.js';
import uuidv4 from '../util/uuid.js';
import createError from '../util/error.js';

class Database {
  storage = null;
  constructor() {
    const savedData = JSON.parse(localStorage.getItem('siteData'));
    this.storage = new Graph(savedData);
  }

  addPointToPoint(parentPolylineKey, polylineInfo) {
    // this will add only point to point connection
    if (parentPolylineKey) {
      const parentPolyline = this.storage.getVertexByKey(parentPolylineKey);
      if (parentPolyline.nodeData.connectionType !== 'pointToPoint') {
        throw new createError(
          'wrongParentPolyline',
          'You are connecting from local connection. point to point can be connected with only point to point connection'
        );
      }
      const uniqueId = uuidv4();
      this.storage.addVertex(uniqueId, polylineInfo);
      this.storage.addEdge(parentPolylineKey, uniqueId);
    } else {
      const uniqueId = uuidv4();
      this.storage.addVertex(uniqueId, polylineInfo);
    }
    this.saveOnLocalStorage();
  }

  addLocalLine(parentPolylineKey, polylineInfo) {
    const parentPolyline = this.storage.getVertexByKey(parentPolylineKey);
    const graphRef = this.storage;
    // this function will get the main point to point location
    const mainPointToPointPolyline = (() => {
      function findPolyline(parentPolyline) {
        if (parentPolyline.nodeData.totalCore > 0) {
          return parentPolyline;
        }
        return findPolyline(graphRef.getVertexByKey(parentPolyline.prevNode));
      }
      return findPolyline(parentPolyline);
    })();

    const uniqueId = uuidv4();

    if (parentPolyline.nodeData.connectionType === 'local') {
      // if prev Connection Local Then just add new local
      this.storage.addVertex(uniqueId, polylineInfo);
      this.storage.addEdge(parentPolylineKey, uniqueId);
    } else if (parentPolyline.nodeData.connectionType === 'pointToPoint') {
      // if prev connection point to point update used core and add new local.
      if (
        !(
          mainPointToPointPolyline.nodeData.usedCore <
          mainPointToPointPolyline.nodeData.totalCore
        )
      ) {
        throw new createError(
          'insufficientCore',
          'all the code already in used'
        );
      } else {
        {
          mainPointToPointPolyline.nodeData.usedCore++;
          this.storage.addVertex(uniqueId, polylineInfo);
          this.storage.addEdge(parentPolylineKey, uniqueId);
        }
      }
    }
    this.saveOnLocalStorage();
  }
  saveOnLocalStorage() {
    const graphData = JSON.stringify(this.storage);
    localStorage.setItem('siteData', graphData);
  }
}

export default Database;
