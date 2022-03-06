const router = require('express').Router();

const {
  createPointToPointConnection,
} = require('../controllers/connectionControllers/pointToPointController.js');

router.get('/create-ptp-connection', createPointToPointConnection);

module.exports = router;
