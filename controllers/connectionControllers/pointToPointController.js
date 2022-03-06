const { body, validationResult } = require('express-validator');
const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

// creating all the main point to point connection controller functions

exports.createPointToPointConnectionValidation = [
  body('name').isEmpty().withMessage('name is required'),

  body('totalCore')
    .isEmpty()
    .withMessage('totalCore is required')
    .isInt({ min: 2 })
    .withMessage('totalCore must be an integer or greater than 2'),

  body('coordinates')
    .isEmpty()
    .withMessage('coordinates is required')
    .isArray()
    .withMessage('coordinates must be an array'),
];

exports.createPointToPointConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, totalCore, coordinates } = req.body;
    const coordinatesLatLngArr = coordinates.map((item) => {
      return [item.lat, item.lng];
    });
    const createdConnection = await pointToPointConnectionModel.create({
      name,
      totalCore,
      location: { coordinates: coordinatesLatLngArr },
      childrenConnection: [],
    });

    return res.status(201).json({
      status: 'success',
      data: createdConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
