const { body, validationResult } = require("express-validator");
const pointToPointConnectionModel = require("../../model/pointToPointConnectionModel");

// ! -> point to point connection validation array
exports.createPointToPointConnectionValidation = [
  body("name").notEmpty().withMessage("name is required"),

  body("totalCore")
    .notEmpty()
    .withMessage("totalCore is required")
    .isInt({ min: 2 })
    .withMessage("totalCore must be an integer or greater than 2"),

  body("coordinates")
    .notEmpty()
    .withMessage("coordinates is required")
    .isArray()
    .withMessage("coordinates must be an array")
    .isLength({ min: 2 })
    .withMessage("coordinates must be an array of at least 2 items"),

  body("length").notEmpty().withMessage("length is required").isNumeric().withMessage("length must be an integer"),
];

// ! -> point to point connection controller functions
exports.createPointToPointConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, totalCore, coordinates, length } = req.body;
    const coordinatesLatLngArr = coordinates.map((item) => [item.lng, item.lat]);
    const createdConnection = await pointToPointConnectionModel.create({
      name,
      totalCore,
      location: { coordinates: coordinatesLatLngArr },
      childrenConnection: [],
      markers: [],
      length,
    });

    return res.status(201).json({
      status: "success",
      data: createdConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// ! -> find nearest point to point connection with coordinates
exports.findNearestPointToPointConnection = async (req, res) => {
  try {
    const { coordinates } = req.query;
    const { lat, lng } = JSON.parse(coordinates);

    const pointToPointConnection = await pointToPointConnectionModel.findOne({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: 100000,
        },
      },
    });

    if (!pointToPointConnection) {
      return res.status(404).json({
        status: "error",
        message: "No point to point connection found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: pointToPointConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// ! -> delete point to point connection
exports.deletePointToPointConnection = async (req, res) => {
  try {
    const { id } = req.query;
    const targetPointToPoint = await pointToPointConnectionModel.findById(id);

    if (!targetPointToPoint) {
      return res.status(404).json({
        status: "error",
        message: "No point to point connection found",
      });
    }

    if (targetPointToPoint.childrens.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "point to point connection has childrens",
      });
    }

    await pointToPointConnectionModel.findByIdAndDelete(targetPointToPoint._id);

    return res.status(200).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
