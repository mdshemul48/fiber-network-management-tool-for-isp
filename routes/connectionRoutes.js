const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
  createPointToPointConnectionValidation,
} = require('../controllers/connectionControllers/pointToPointController.js');

const {
  createCorporateConnection,
  createCorporateConnectionValidation,
} = require('../controllers/connectionControllers/corporateController.js');

const {
  createResellerConnection,
  // createResellerConnectionValidation,
} = require('../controllers/connectionControllers/resellerController.js');

const { getAllConnection } = require('../controllers/getAllConnection.js');

router.get('/getAllConnection', getAllConnection);

// creating routes
router.post(
  '/create-ptp-connection',
  createPointToPointConnectionValidation,
  createPointToPointConnection
);

router.post(
  '/create-corporate-connection',
  createCorporateConnectionValidation,
  createCorporateConnection
);

router.post('/create-reseller-connection', createResellerConnection);

module.exports = router;
