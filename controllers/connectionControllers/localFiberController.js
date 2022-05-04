const { body, query, validationResult } = require("express-validator");

const localFiberConnectionModel = require("../../model/localFiberConnectionModel");
const resellerConnectionModel = require("../../model/resellerConnectionModel");

exports.createLocalFiberConnectionValidation = [
  body("name").notEmpty().withMessage("name is required"),
  body("parent").notEmpty().withMessage("parent is required"),
  body("parentType").notEmpty().withMessage("parentType is required"),
  body("coordinates").notEmpty().withMessage("coordinates is required"),
  body("totalCore").notEmpty().withMessage("totalCore is required").isIn().withMessage("totalCore must be a number"),
  body("length").notEmpty().withMessage("length is required").isInt().withMessage("length must be an integer"),
];

exports.createLocalFiberConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, parent, parentType, totalCore, coordinates, length } = req.body;

    let selectedParent = null;
    if (parentType === "reseller") {
      selectedParent = await resellerConnectionModel.findOne({ _id: parent });
    } else if (parentType === "localFiber") {
      selectedParent = await localFiberConnectionModel.findOne({ _id: parent }).populate("parent");
    }

    if (!selectedParent) {
      return res.status(400).json({
        status: "error",
        message: "parent connection does not exist",
      });
    }

    const coordinatesLatLngArr = coordinates.map((item) => [item.lat, item.lng]);

    if (selectedParent.type === "reseller") {
      const createLocalFiberConnection = await localFiberConnectionModel.create({
        name,
        parent: selectedParent._id,
        parentType: "reseller",
        reseller: selectedParent._id,
        totalCore,
        length,
        type: "localFiber",
        locations: {
          coordinates: coordinatesLatLngArr,
        },
      });

      await createLocalFiberConnection.save();

      selectedParent.childrens.push({
        child: createLocalFiberConnection._id,
        connectionType: "localFiber",
      });

      await selectedParent.save();

      return res.status(201).json({
        status: "success",
        data: createLocalFiberConnection,
      });
    }
    if (selectedParent.type === "localFiber") {
      const createLocalFiberConnection = await localFiberConnectionModel.create({
        name,
        parent: selectedParent._id,
        reseller: selectedParent.reseller,
        parentType: "localFiber",
        totalCore,
        type: "localFiber",
        locations: {
          coordinates: coordinatesLatLngArr,
        },
      });

      if (selectedParent.mainLocalFiber) {
        createLocalFiberConnection.mainLocalFiber = selectedParent.mainLocalFiber;
      } else if (selectedParent.parent.type === "reseller") {
        createLocalFiberConnection.mainLocalFiber = selectedParent._id;
      } else {
        return res.status(400).json({
          status: "error",
          message: "parent connection does not exist",
        });
      }
      await createLocalFiberConnection.save();

      selectedParent.childrens.push({
        child: createLocalFiberConnection._id,
        connectionType: "localFiber",
      });

      await selectedParent.save();

      return res.status(201).json({
        status: "success",
        data: createLocalFiberConnection,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "something went wrong",
  });
};

exports.deleteLocalFiberConnectionValidation = [query("id").notEmpty().withMessage("id is required")];

exports.deleteLocalFiberConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.query;

    const selectedLocalFiberConnection = await localFiberConnectionModel.findById(id).populate("parent");

    if (!selectedLocalFiberConnection) {
      return res.status(400).json({
        status: "error",
        message: "connection does not exist",
      });
    }

    if (selectedLocalFiberConnection.childrens.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "connection has childrens",
      });
    }

    selectedLocalFiberConnection.parent.childrens = selectedLocalFiberConnection.parent.childrens.filter(
      (item) => item.child.toString() !== selectedLocalFiberConnection._id.toString()
    );

    await selectedLocalFiberConnection.parent.save();
    await selectedLocalFiberConnection.remove();

    return res.status(200).json({
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
