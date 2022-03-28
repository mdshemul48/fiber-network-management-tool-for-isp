const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
  createPointToPointConnectionValidation,
  findNearestPointToPointConnection,
  deletePointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController.js');

const {
  createCorporateConnection,
  createCorporateConnectionValidation,
  deleteCorporateConnection,
} = require('../controllers/connectionControllers/corporateController.js');

const {
  createResellerConnection,
  createResellerConnectionValidation,
  deleteResellerConnection,
} = require('../controllers/connectionControllers/resellerController.js');

const {
  createLocalFiberConnection,
  createLocalFiberConnectionValidation,
} = require('../controllers/connectionControllers/localFiberController.js');

const {
  createSplitterConnection,
  createSplitterValidation,
} = require('../controllers/connectionControllers/splitterController.js');

const {
  createHomeConnection,
} = require('../controllers/connectionControllers/homeController.js');

const { getAllConnection } = require('../controllers/getAllConnection.js');

router.get('/getAllConnection', getAllConnection);

// creating routes

router
  .route('/ptp-connection')

  .get(findNearestPointToPointConnection)

  .post(createPointToPointConnectionValidation, createPointToPointConnection)

  .delete(deletePointToPointConnection);

router
  .route('/corporate-connection')

  .post(createCorporateConnectionValidation, createCorporateConnection)

  .delete(deleteCorporateConnection);

router
  .route('/reseller-connection')

  .post(createResellerConnectionValidation, createResellerConnection)

  .delete(deleteResellerConnection);

router.post(
  '/local-fiber-connection',
  createLocalFiberConnectionValidation,
  createLocalFiberConnection
);

router.post(
  '/splitter-connection',
  createSplitterValidation,
  createSplitterConnection
);

router.post('/home-connection', createHomeConnection);

module.exports = router;
