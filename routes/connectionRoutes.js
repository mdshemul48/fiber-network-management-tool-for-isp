const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
  createPointToPointConnectionValidation,
} = require('../controllers/connectionControllers/pointToPointController.js');

// creating routes
router.post(
  '/create-ptp-connection',
  createPointToPointConnectionValidation,
  createPointToPointConnection
);

module.exports = router;
