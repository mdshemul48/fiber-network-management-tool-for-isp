const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');
const resellerConnectionModel = require('../../model/resellerConnectionModel.js');
const { body, validationResult } = require('express-validator');

exports.createResellerConnectionValidation = [
  body('parent').notEmpty().withMessage('parent is required'),
  body('name').notEmpty().withMessage('name is required'),
  body('oltSerialNumber').notEmpty().withMessage('oltSerialNumber is required'),
  body('portNo')
    .notEmpty()
    .withMessage('portNo is required')
    .isInt({ min: 1 })
    .withMessage('portNo must be an integer or greater than 0'),
  body('type').notEmpty().withMessage('type is required'),
  body('oltType').notEmpty().withMessage('oltType is required'),
  body('coordinates')
    .notEmpty()
    .withMessage('coordinates is required')
    .isArray()
    .withMessage('coordinates must be an array')
    .isLength({ min: 2 })
    .withMessage('coordinates must have at least 2 items'),
  body('color').notEmpty().withMessage('color is required'),
];

exports.createResellerConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      parent,
      name,
      oltSerialNumber,
      portNo,
      type,
      oltType,
      coordinates,
      color,
    } = req.body;

    const parentConnection = await pointToPointConnectionModel.findById(parent);

    if (!parentConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection does not exist',
      });
    }

    if (parentConnection.type !== 'pointToPoint') {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection is not a point to point connection',
      });
    }

    if (parentConnection.childrens.find((item) => item.color === color)) {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection already has a child with the same color',
      });
    }

    if (!(parentConnection.totalConnected < parentConnection.totalCore))
      return res.status(400).json({
        status: 'error',
        message: 'parent connection is full',
      });

    // creating reseller connection
    const coordinatesLatLngArr = coordinates.map((item) => {
      return [item.lat, item.lng];
    });

    const createdResellerConnection = await resellerConnectionModel.create({
      parentType: parentConnection.type,
      parent: parentConnection._id.toString(),
      name,
      oltSerialNumber,
      portNo,
      type,
      oltType,
      connectionLimit: oltType === 'epon' ? 64 : 128,
      location: { coordinates: coordinatesLatLngArr },
      color,
    });

    parentConnection.childrens.push({
      color,
      portNo,
      connectionType: 'reseller',
      child: createdResellerConnection._id.toString(),
    });

    const markerPoint = parentConnection.markers.find((item) => {
      return item.location.coordinates[0] === coordinatesLatLngArr[0][0];
    });

    if (!markerPoint) {
      parentConnection.markers.push({
        location: { coordinates: coordinatesLatLngArr[0] },
      });
    } else {
      markerPoint.totalConnected++;
    }

    parentConnection.totalConnected++;
    parentConnection.save();

    return res.status(201).json({
      status: 'success',
      data: createdResellerConnection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.deleteResellerConnection = async (req, res) => {
  try {
    const { id } = req.query;
    const resellerConnection = await resellerConnectionModel.findById(id);

    if (!resellerConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'reseller connection does not exist',
      });
    }

    if (resellerConnection.childrens.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'reseller connection has childrens',
      });
    }

    const parentConnection = await pointToPointConnectionModel.findById(
      resellerConnection.parent
    );

    if (!parentConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection does not exist',
      });
    }

    const parentConnectionIndex = parentConnection.childrens.findIndex(
      (item) => item.child.toString() === id
    );

    if (parentConnectionIndex === -1) {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection does not have this child',
      });
    }

    parentConnection.childrens.splice(parentConnectionIndex, 1);
    parentConnection.totalConnected--;

    const markerPoint = parentConnection.markers.findIndex((item) => {
      return (
        item.location.coordinates[0] ===
        resellerConnection.location.coordinates[0][0]
      );
    });

    if (markerPoint !== -1) {
      if (parentConnection.markers[markerPoint].totalConnected === 1) {
        parentConnection.markers.splice(markerPoint, 1);
      } else {
        parentConnection.markers[markerPoint].totalConnected--;
      }
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection does not have this child',
      });
    }

    parentConnection.save();

    await resellerConnection.remove();

    return res.status(200).json({
      status: 'success',
      data: resellerConnection,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};