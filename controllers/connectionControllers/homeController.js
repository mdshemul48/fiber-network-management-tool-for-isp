const { body, validationResult } = require("express-validator");
const homeConnectionModel = require("../../model/homeConnectionModel");
const splitterConnectionModel = require("../../model/splitterConnectionModel");

exports.createHomeConnectionValidation = [
  body("parent").notEmpty().withMessage("parent is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("color").notEmpty().withMessage("color is required"),
  body("coordinates")
    .notEmpty()
    .withMessage("coordinates is required")
    .isArray()
    .withMessage("coordinates must be an array")
    .isLength({ min: 2 })
    .withMessage("coordinates must be an array of at least 2 items"),
  body("totalCore").notEmpty().withMessage("totalCore is required").isIn().withMessage("totalCore must be a number"),
  body("length").notEmpty().withMessage("length is required").isInt().withMessage("length must be an integer"),
];

exports.createHomeConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { parent, name, coordinates, onuNo, color, totalCore, length } = req.body;
    const coordinatesLatLngArr = coordinates.map((item) => [item.lat, item.lng]);

    const splitter = await splitterConnectionModel.findById(parent).populate("reseller");

    if (!splitter) {
      return res.status(400).json({
        status: "error",
        message: "Invalid splitter id",
      });
    }

    if (!(splitter.splitterUsed < splitter.splitterLimit)) {
      return res.json({
        status: "error",
        message: "Splitter fiber is full",
      });
    }

    if (!splitter.reseller) {
      return res.status(400).json({
        status: "error",
        message: "Invalid reseller id",
      });
    }

    const targetSplitterInReseller = splitter.reseller.childrens.find((item) => item.portNo === splitter.portNo);

    if (!targetSplitterInReseller) {
      return res.status(400).json({
        status: "error",
        message: "Invalid splitter id",
      });
    }

    if (!(targetSplitterInReseller.connectionUsed < splitter.reseller.connectionLimit)) {
      return res.json({
        status: "error",
        message: "port is full",
      });
    }

    const alreadyExistColoredConnection = splitter.childrens.find((item) => item.color === color);

    if (alreadyExistColoredConnection) {
      return res.status(400).json({
        status: "error",
        message: "splitter already has a colored connection",
      });
    }

    const newHomeConnection = await homeConnectionModel.create({
      parentType: "splitter",
      parent: splitter._id,
      name,
      onuNo,
      color,
      locations: {
        coordinates: coordinatesLatLngArr,
      },
      totalCore,
      length,
    });

    splitter.childrens.push({
      connectionType: "home",
      child: newHomeConnection._id,
      color,
    });

    if (!targetSplitterInReseller) {
      return res.status(400).json({
        status: "error",
        message: "Invalid splitter id",
      });
    }

    splitter.splitterUsed += 1;
    splitter.reseller.connectionUsed += 1;
    targetSplitterInReseller.connectionUsed += 1;

    splitter.save();
    splitter.reseller.save();
    return res.status(201).json({
      status: "success",
      data: newHomeConnection,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteHomeConnection = async (req, res) => {
  try {
    const { id } = req.query;
    const homeConnection = await homeConnectionModel.findById(id);

    if (!homeConnection) {
      return res.status(400).json({
        status: "error",
        message: "Invalid home connection id",
      });
    }

    const splitter = await splitterConnectionModel.findById(homeConnection.parent).populate("reseller");

    if (!splitter) {
      return res.status(400).json({
        status: "error",
        message: "Invalid splitter id",
      });
    }

    const homeConnectionIndex = splitter.childrens.findIndex(
      (item) => item.child.toString() === homeConnection._id.toString()
    );

    if (homeConnectionIndex === -1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid home connection id",
      });
    }

    splitter.childrens.splice(homeConnectionIndex, 1);

    const targetSplitterInReseller = splitter.reseller.childrens.find((item) => item.portNo === splitter.portNo);

    if (!targetSplitterInReseller) {
      return res.status(400).json({
        status: "error",
        message: "Invalid splitter id",
      });
    }

    splitter.splitterUsed -= 1;
    splitter.reseller.connectionUsed -= 1;
    targetSplitterInReseller.connectionUsed -= 1;

    splitter.save();
    splitter.reseller.save();
    homeConnection.remove();
    return res.status(200).json({
      status: "success",
      message: "home connection deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
