const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
  createPointToPointConnectionValidation,
  findNearestPointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController.js');

const {
  createCorporateConnection,
  createCorporateConnectionValidation,
} = require('../controllers/connectionControllers/corporateController.js');

const {
  createResellerConnection,
  createResellerConnectionValidation,
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

  .post(createPointToPointConnectionValidation, createPointToPointConnection);

router.post(
  '/corporate-connection',
  createCorporateConnectionValidation,
  createCorporateConnection
);

router.post(
  '/reseller-connection',
  createResellerConnectionValidation,
  createResellerConnection
);

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
