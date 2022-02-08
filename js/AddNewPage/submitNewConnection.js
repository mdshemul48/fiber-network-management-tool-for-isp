import Database from '../storage/fakeDatabase.js';
import createError from '../util/error.js';

const db = new Database();
const submitPointToPointHandler = (
  totalCore,
  connectionType,
  allCoordinates
) => {
  console.log(totalCore, connectionType, allCoordinates);

  if (!totalCore || totalCore < 1)
    throw new createError('invalidCore', 'you have not entered valid core.');

  db.addPointToPoint(null, {
    totalCore,
    connectionType,
    allCoordinates,
    usedCore: 0,
  });
};

const submitLocalHandler = (
  parentPolylineKey,
  connectionType,
  allCoordinates
) => {
  if (!parentPolylineKey)
    throw new createError(
      'parentKeyError',
      'you have not entered valid parent polyline key'
    );
  console.log(connectionType, allCoordinates);
  db.addLocalLine(parentPolylineKey, { connectionType, allCoordinates });
};

export { submitPointToPointHandler, submitLocalHandler };
