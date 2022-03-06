const { body, validationResult } = require('express-validator');
const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

// point to point connection validation array
exports.createPointToPointConnectionValidation = [
  body('name').notEmpty().withMessage('name is required'),

  body('totalCore')
    .notEmpty()
    .withMessage('totalCore is required')
    .isInt({ min: 2 })
    .withMessage('totalCore must be an integer or greater than 2'),

  body('coordinates')
    .notEmpty()
    .withMessage('coordinates is required')
    .isArray()
    .withMessage('coordinates must be an array')
    .isLength({ min: 2 })
    .withMessage('coordinates must be an array of at least 2 items'),
];

// point to point connection controller functions
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
