const router = require('express').Router();

// importing all the controllers
const {
  createPointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController.js');

// creating routes
router.post('/create-ptp-connection', createPointToPointConnection);

module.exports = router;
