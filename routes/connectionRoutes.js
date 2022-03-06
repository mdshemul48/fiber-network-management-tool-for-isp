const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController.js');

// creating routes
router.get('/create-ptp-connection', createPointToPointConnection);

module.exports = router;
