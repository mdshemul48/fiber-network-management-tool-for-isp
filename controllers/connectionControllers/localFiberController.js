const { body, query, validationResult } = require('express-validator');

const localFiberConnectionModel = require('../../model/localFiberConnectionModel.js');
const resellerConnectionModel = require('../../model/resellerConnectionModel.js');

exports.createLocalFiberConnectionValidation = [
  body('name').notEmpty().withMessage('name is required'),
  body('parent').notEmpty().withMessage('parent is required'),
  body('parentType').notEmpty().withMessage('parentType is required'),
  body('totalCore').notEmpty().withMessage('totalCore is required'),
  body('coordinates').notEmpty().withMessage('coordinates is required'),
];

exports.createLocalFiberConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, parent, parentType, totalCore, coordinates } = req.body;

    let selectedParent = null;
    if (parentType === 'reseller') {
      selectedParent = await resellerConnectionModel.findOne({ _id: parent });
    } else if (parentType === 'localFiber') {
      selectedParent = await localFiberConnectionModel
        .findOne({ _id: parent })
        .populate('parent');
    }

    if (!selectedParent) {
      return res.status(400).json({
        status: 'error',
        message: 'parent connection does not exist',
      });
    }

    const coordinatesLatLngArr = coordinates.map((item) => {
      return [item.lat, item.lng];
    });

    if (selectedParent.type === 'reseller') {
      const createLocalFiberConnection = await localFiberConnectionModel.create(
        {
          name,
          parent: selectedParent._id,
          parentType: 'reseller',
          totalCore,
          type: 'localFiber',
          totalCore,
          locations: {
            coordinates: coordinatesLatLngArr,
          },
        }
      );

      await createLocalFiberConnection.save();

      selectedParent.childrens.push({
        child: createLocalFiberConnection._id,
        connectionType: 'localFiber',
      });

      await selectedParent.save();

      return res.status(201).json({
        status: 'success',
        data: createLocalFiberConnection,
      });
    } else if (selectedParent.type === 'localFiber') {
      let createLocalFiberConnection = null;

      if (selectedParent.mainLocalFiber) {
        createLocalFiberConnection = await localFiberConnectionModel.create({
          name,
          parent: selectedParent._id,
          parentType: 'localFiber',
          totalCore,
          type: 'localFiber',
          mainLocalFiber: selectedParent.mainLocalFiber,
          totalCore,
          locations: {
            coordinates: coordinatesLatLngArr,
          },
        });
      } else if (selectedParent.parent.type === 'reseller') {
        createLocalFiberConnection = await localFiberConnectionModel.create({
          name,
          parent: selectedParent._id,
          parentType: 'localFiber',
          totalCore,
          type: 'localFiber',
          mainLocalFiber: selectedParent._id,
          totalCore,
          locations: {
            coordinates: coordinatesLatLngArr,
          },
        });
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'parent connection does not exist',
        });
      }
      await createLocalFiberConnection.save();

      selectedParent.childrens.push({
        child: createLocalFiberConnection._id,
        connectionType: 'localFiber',
      });

      await selectedParent.save();

      return res.status(201).json({
        status: 'success',
        data: createLocalFiberConnection,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.deleteLocalFiberConnectionValidation = [
  query('id').notEmpty().withMessage('id is required'),
  query('subId').notEmpty().withMessage('subId is required'),
];

exports.deleteLocalFiberConnection = async (req, res) => {
  try {
    // validating the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, subId } = req.query;

    const selectedLocalFiberConnection =
      await localFiberConnectionModel.findById(id);

    if (!selectedLocalFiberConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'localFiberConnection does not exist',
      });
    }

    if (selectedLocalFiberConnection.childrens.length > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'localFiberConnection has childrens',
      });
    }

    if (selectedLocalFiberConnection.mainConnection.toString() === subId) {
      if (
        selectedLocalFiberConnection.childrens > 0 ||
        selectedLocalFiberConnection.locations.length > 1
      ) {
        return res.status(400).json({
          status: 'error',
          message: 'cannot delete main connection',
        });
      }

      const selectedParent = await resellerConnectionModel.findById(
        selectedLocalFiberConnection.parent
      );

      if (!selectedParent) {
        return res.status(400).json({
          status: 'error',
          message: 'parent connection does not exist',
        });
      }

      const selectedParentIndex = selectedParent.childrens.findIndex(
        (item) => item.child.toString() === id
      );

      if (selectedParentIndex === -1) {
        return res.status(400).json({
          status: 'error',
          message: 'parent connection does not exist',
        });
      }

      selectedParent.childrens.splice(selectedParentIndex, 1);

      await selectedParent.save();
      await selectedLocalFiberConnection.remove();
    } else {
      const selectedLocalFiberConnectionSubIndex =
        selectedLocalFiberConnection.locations.findIndex((item) => {
          return item._id.toString() === subId;
        });

      if (selectedLocalFiberConnectionSubIndex === -1) {
        return res.status(400).json({
          status: 'error',
          message: 'location does not exist',
        });
      }

      selectedLocalFiberConnection.locations.splice(
        selectedLocalFiberConnectionSubIndex,
        1
      );

      await selectedLocalFiberConnection.save();
    }

    return res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
