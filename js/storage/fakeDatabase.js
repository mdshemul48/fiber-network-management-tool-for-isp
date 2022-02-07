import Graph from './Graph.js';
import uuidv4 from '../util/uuid.js';
class Database {
  storage = null;
  constructor() {
    this.storage = new Graph();
  }

  addPointToPoint(coordinates, id, totalCore) {
    if (id) {
      const targetPTP = this.storage.find((connection) => connection.id === id);

      targetPTP.pointToPoint.push(coordinates);
    } else {
      if (!totalCore || totalCore < 1)
        throw new createError(
          'invalidCore',
          'you have not entered valid core.'
        );

      const uniqueId = uuidv4();
      const polyLineInfo = {
        id: uniqueId,
        pointToPoint: [coordinates],
        local: [],
        totalCore,
      };
      this.storage.push(polyLineInfo);
      console.log(storage);
    }
  }
}

export default Database;
