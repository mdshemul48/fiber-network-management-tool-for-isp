import Database from '../storage/fakeDatabase.js';
import createError from '../util/error.js';
const submitNewHandler = (totalCore, connectionType, allCoordinates) => {
  const db = new Database();
  console.log(totalCore, connectionType, allCoordinates);

  if (!totalCore || totalCore < 1)
    throw new createError('invalidCore', 'you have not entered valid core.');

  db.addPointToPoint(null, { totalCore, connectionType, allCoordinates });
};
export default submitNewHandler;
