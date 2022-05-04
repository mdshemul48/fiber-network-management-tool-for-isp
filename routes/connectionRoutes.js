const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
  createPointToPointConnectionValidation,
  findNearestPointToPointConnection,
  deletePointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController');

const {
  createCorporateConnection,
  createCorporateConnectionValidation,
  deleteCorporateConnection,
} = require('../controllers/connectionControllers/corporateController');

const {
  createResellerConnection,
  createResellerConnectionValidation,
  deleteResellerConnection,
} = require('../controllers/connectionControllers/resellerController');

const {
  createLocalFiberConnection,
  createLocalFiberConnectionValidation,
  deleteLocalFiberConnection,
  deleteLocalFiberConnectionValidation,
} = require('../controllers/connectionControllers/localFiberController');

const {
  createSplitterConnection,
  createSplitterValidation,
  deleteSplitterConnection,
  findNearestSplitterConnection,
} = require('../controllers/connectionControllers/splitterController');

const {
  createHomeConnection,
  createHomeConnectionValidation,
  deleteHomeConnection,
} = require('../controllers/connectionControllers/homeController');

const { getAllConnection } = require('../controllers/getAllConnection');

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

router
  .route('/local-fiber-connection')

  .post(createLocalFiberConnectionValidation, createLocalFiberConnection)

  .delete(deleteLocalFiberConnectionValidation, deleteLocalFiberConnection);

router
  .route('/splitter-connection')

  .get(findNearestSplitterConnection)

  .post(createSplitterValidation, createSplitterConnection)

  .delete(deleteSplitterConnection);

router
  .route('/home-connection')

  .post(createHomeConnectionValidation, createHomeConnection)

  .delete(deleteHomeConnection);

module.exports = router;
