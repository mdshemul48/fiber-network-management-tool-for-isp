const { body, validationResult } = require("express-validator");

const pointToPointConnectionModel = require("../../model/pointToPointConnectionModel");
const corporateConnectionModel = require("../../model/corporateConnectionModel");

// validating the request body for create corporate connection request
exports.createCorporateConnectionValidation = [
  body("parent").notEmpty().withMessage("parent is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("portNo")
    .notEmpty()
    .withMessage("portNo is required")
    .isInt({ min: 1 })
    .withMessage("portNo must be an integer or greater than 0"),
  body("coreColor").notEmpty().withMessage("coreColor is required"),
  body("coordinates")
    .notEmpty()
    .withMessage("coordinates is required")
    .isArray()
    .withMessage("coordinates must be an array")
    .isLength({ min: 2 })
    .withMessage("coordinates must be an array of at least 2 items"),
  body("totalCore").notEmpty().withMessage("totalCore is required"),
];

// creating corporate connection
exports.createCorporateConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parent, name, portNo, coreColor, coordinates, totalCore } = req.body;

    const parentConnection = await pointToPointConnectionModel.findById(parent);

    if (!parentConnection) {
      return res.status(400).json({
        status: "error",
        message: "parent connection does not exist",
      });
    }

    if (!(parentConnection.totalConnected < parentConnection.totalCore)) {
      return res.status(400).json({
        status: "error",
        message: "parent connection is full",
      });
    }

    if (parentConnection.childrens.find((item) => item.color === coreColor || item.portNo === parseInt(portNo, 10))) {
      return res.status(400).json({
        status: "error",
        message: "parent connection already has a child with the same color or port number",
      });
    }

    // creating the connection
    const coordinatesLatLngArr = coordinates.map((item) => [item.lat, item.lng]);

    const createdCorporateConnection = await corporateConnectionModel.create({
      parentType: parentConnection.type,
      parent: parentConnection._id.toString(),
      name,
      portNo,
      color: coreColor,
      location: { coordinates: coordinatesLatLngArr },
      totalCore,
    });

    parentConnection.childrens.push({
      color: coreColor,
      portNo,
      connectionType: "corporate",
      child: createdCorporateConnection._id.toString(),
    });

    const markerPoint = parentConnection.markers.find(
      (item) => item.location.coordinates[0] === coordinatesLatLngArr[0][0]
    );

    if (!markerPoint) {
      parentConnection.markers.push({
        location: { coordinates: coordinatesLatLngArr[0] },
      });
    } else {
      markerPoint.totalConnected += 1;
    }

    parentConnection.totalConnected += 1;
    await parentConnection.save();

    return res.status(201).json({
      status: "success",
      data: createdCorporateConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteCorporateConnection = async (req, res) => {
  try {
    const { id } = req.query;

    const corporateConnection = await corporateConnectionModel.findById(id).populate("parent");

    if (!corporateConnection) {
      return res.status(400).json({
        status: "error",
        message: "corporate connection does not exist",
      });
    }

    const parentConnection = corporateConnection.parent;

    if (!parentConnection) {
      return res.status(400).json({
        status: "error",
        message: "parent connection does not exist",
      });
    }

    const parentConnectionIndex = parentConnection.childrens.findIndex((item) => item.child.toString() === id);

    if (parentConnectionIndex === -1) {
      return res.status(400).json({
        status: "error",
        message: "parent connection does not have this child",
      });
    }

    parentConnection.childrens.splice(parentConnectionIndex, 1);
    parentConnection.totalConnected -= 1;

    const markerPoint = parentConnection.markers.findIndex(
      (item) => item.location.coordinates[0] === corporateConnection.location.coordinates[0][0]
    );

    if (markerPoint !== -1) {
      if (parentConnection.markers[markerPoint].totalConnected === 1) {
        parentConnection.markers.splice(markerPoint, 1);
      } else {
        parentConnection.markers[markerPoint].totalConnected -= 1;
      }
    } else {
      return res.status(400).json({
        status: "error",
        message: "parent connection does not have this child",
      });
    }

    await parentConnection.save();

    await corporateConnection.remove();

    return res.status(200).json({
      status: "success",
      data: {
        message: "corporate connection deleted successfully",
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
