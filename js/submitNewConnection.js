import Database from './storage/fakeDatabase.js';

const submitNewHandler = (totalCore, connectionType, allCoordinates) => {
  const db = new Database();
  console.log(totalCore, connectionType, allCoordinates);
  db.addPointToPoint(null, { totalCore, connectionType, allCoordinates });
};
export default submitNewHandler;
