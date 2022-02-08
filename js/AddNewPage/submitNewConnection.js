import Database from '../storage/fakeDatabase.js';
import createError from '../util/error.js';

const db = new Database();
const submitPointToPointHandler = (
  selectedPolyline,
  totalCore,
  connectionType,
  allCoordinates
) => {
  console.log(totalCore, connectionType, allCoordinates);

  if (!selectedPolyline && (!totalCore || totalCore < 1))
    throw new createError('invalidCore', 'you have not entered valid core.');

  db.addPointToPoint(selectedPolyline, {
    totalCore: totalCore > 0 ? totalCore : undefined,
    connectionType,
    allCoordinates,
    usedCore: totalCore > 0 ? 0 : undefined,
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
