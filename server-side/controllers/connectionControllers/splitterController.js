const { body, validationResult } = require('express-validator');
const resellerConnectionModel = require('../../model/resellerConnectionModel.js');
const splitterConnectionModel = require('../../model/splitterConnectionModel.js');
const localFiberConnectionModel = require('../../model/localFiberConnectionModel.js');

exports.createSplitterValidation = [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('parentType').not().isEmpty().withMessage('Parent type is required'),
  body('parent').not().isEmpty().withMessage('Parent type is required'),
  body('coordinates')
    .not()
    .isEmpty()
    .withMessage('Coordinates are required')
    .isArray()
    .withMessage('Coordinates must be an array'),
  body('splitterLimit')
    .not()
    .isEmpty()
    .withMessage('Splitter limit is required')
    .isNumeric()
    .withMessage('Splitter limit must be a number'),
];

exports.createSplitterConnection = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      parent,
      parentType,
      name,
      coordinates,
      splitterLimit,
      color,
      portNo,
    } = req.body;

    // creating the connection
    const coordinatesLatLngArr = coordinates.map((item) => {
      return [item.lng, item.lat];
    });

    let reseller;
    if (parentType === 'reseller') {
      // ! create splitter connection for reseller
      reseller = await resellerConnectionModel.findById(parent);
      if (!reseller) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid reseller id',
        });
      }

      const alreadyExistSplitter = reseller.childrens.find((item) => {
        return (
          item.connectionType === 'splitter' &&
          ((item.color !== undefined && item.color === color) ||
            item.portNo === parseInt(portNo))
        );
      });

      if (alreadyExistSplitter) {
        return res.status(400).json({
          status: 'error',
          message:
            'reseller already has a splitter with the same color or port number',
        });
      }

      const splitterConnection = await splitterConnectionModel.create({
        parentType: 'reseller',
        parent: reseller._id,
        reseller: reseller._id,
        name,
        splitterLimit,
        portNo,
        location: {
          coordinates: coordinatesLatLngArr,
        },
        lastPoint: {
          coordinates: coordinatesLatLngArr[coordinatesLatLngArr.length - 1],
        },
      });

      reseller.childrens.push({
        portNo,
        connectionType: 'splitter',
        child: splitterConnection._id,
        connectionUsed: 0,
      });

      await reseller.save();

      return res.status(200).json({
        status: 'success',
        data: splitterConnection,
      });
    } else if (parentType === 'localFiber') {
      // ! create splitter connection from local fiber
      const localFiber = await localFiberConnectionModel
        .findById(parent)
        .populate(['reseller', 'mainLocalFiber']);

      if (!localFiber) {
        return res.json({
          status: 'error',
          message: 'Invalid localFiber id',
        });
      }

      if (!(localFiber.totalConnected < localFiber.totalCore)) {
        return res.json({
          status: 'error',
          message: 'Local fiber is full',
        });
      }

      if (!localFiber.reseller) {
        return res.json({
          status: 'error',
          message: 'Invalid reseller id',
        });
      }

      const alreadyExistSplitterInReseller = localFiber.reseller.childrens.find(
        (item) => {
          return (
            item.connectionType === 'splitter' &&
            ((item.color !== undefined && item.color === color) ||
              item.portNo === parseInt(portNo))
          );
        }
      );

      if (alreadyExistSplitterInReseller) {
        return res.status(400).json({
          status: 'error',
          message:
            'reseller already has a splitter with the same color or port number',
        });
      }

      const alreadyExistSplitterInLocalFiber = localFiber.childrens.find(
        (item) => {
          return (
            item.connectionType === 'splitter' &&
            item.color !== undefined &&
            item.color === color
          );
        }
      );

      if (alreadyExistSplitterInLocalFiber) {
        return res.status(400).json({
          status: 'error',
          message: 'Local fiber already has a splitter with the same color',
        });
      }

      if (localFiber.mainLocalFiber) {
        if (
          !(
            localFiber.mainLocalFiber.totalConnected <
            localFiber.mainLocalFiber.totalCore
          )
        ) {
          return res.json({
            status: 'error',
            message: 'Local fiber is full',
          });
        }

        const alreadyExistParentSplitter =
          localFiber.mainLocalFiber.childrens.find((item) => {
            return (
              item.connectionType === 'splitter' &&
              item.color !== undefined &&
              item.color === color
            );
          });

        if (alreadyExistParentSplitter) {
          return res.status(400).json({
            status: 'error',
            message: 'Local fiber already has a splitter with the same color',
          });
        }
      }

      const splitterConnection = await splitterConnectionModel.create({
        parentType: 'localFiber',
        parent: localFiber._id,
        reseller: localFiber.reseller._id,
        name,
        splitterLimit,
        portNo,
        color,
        location: {
          coordinates: coordinatesLatLngArr,
        },
        lastPoint: {
          coordinates: coordinatesLatLngArr[coordinatesLatLngArr.length - 1],
        },
      });

      localFiber.reseller.childrens.push({
        portNo,
        connectionType: 'splitter',
        child: splitterConnection._id,
        connectionUsed: 0,
      });

      localFiber.childrens.push({
        color,
        connectionType: 'splitter',
        child: splitterConnection._id,
      });

      if (localFiber.mainLocalFiber) {
        localFiber.mainLocalFiber.childrens.push({
          color,
          connectionType: 'splitter',
          child: splitterConnection._id,
        });
        localFiber.mainLocalFiber.totalConnected++;
        localFiber.mainLocalFiber.save();
      }

      const markerPoint = localFiber.markers.find((item) => {
        return item.coordinates[0] === coordinatesLatLngArr[0][0];
      });
      if (!markerPoint) {
        localFiber.markers.push({
          coordinates: coordinatesLatLngArr[0],
        });
      } else {
        markerPoint.totalConnected++;
      }

      localFiber.totalConnected++;
      await localFiber.save();
      await localFiber.reseller.save();

      return res.status(200).json({
        status: 'success',
        data: splitterConnection,
      });
    } else if (parentType === 'splitter') {
      // ! create splitter connection from  another splitter
      const splitter = await splitterConnectionModel.findById(parent);
      if (!splitter) {
        return res.json({
          status: 'error',
          message: 'Invalid splitter id',
        });
      }

      if (!(splitter.splitterUsed < splitter.splitterLimit)) {
        return res.json({
          status: 'error',
          message: 'Splitter fiber is full',
        });
      }

      const reseller = await resellerConnectionModel.findById(
        splitter.reseller.toString()
      );
      if (!reseller) {
        return res.json({
          status: 'error',
          message: 'Invalid reseller id',
        });
      }

      const alreadyExistSplitter = splitter.childrens.find((item) => {
        return item.color === color;
      });

      if (alreadyExistSplitter) {
        return res.status(400).json({
          status: 'error',
          message: 'splitter already has a splitter with the same color',
        });
      }

      const splitterConnection = await splitterConnectionModel.create({
        parentType: 'splitter',
        parent: splitter._id,
        reseller: reseller._id,
        name,
        color,
        splitterLimit,
        portNo: splitter.portNo,
        location: {
          coordinates: coordinatesLatLngArr,
        },
        lastPoint: {
          coordinates: coordinatesLatLngArr[coordinatesLatLngArr.length - 1],
        },
      });

      splitter.childrens.push({
        color,
        connectionType: 'splitter',
        child: splitterConnection._id,
      });

      splitter.splitterUsed += 1;

      await splitter.save();
      await reseller.save();

      return res.status(200).json({
        status: 'success',
        data: splitterConnection,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid parentType',
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.findNearestSplitterConnection = async (req, res) => {
  try {
    const { coordinates } = req.query;

    if (!coordinates) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid coordinates',
      });
    }

    const { lat, lng } = JSON.parse(coordinates);

    const splitterConnection = await splitterConnectionModel.findOne({
      lastPoint: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: 100000,
        },
      },
    });

    if (!splitterConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'No splitter connection found',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: splitterConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.deleteSplitterConnection = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid splitter id',
      });
    }

    const splitterConnection = await splitterConnectionModel
      .findById(id)
      .populate('parent')
      .populate('reseller');

    if (!splitterConnection) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid splitter connection id',
      });
    }

    if (splitterConnection.splitterUsed > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'splitter connection is used',
      });
    }

    if (splitterConnection.parent.type === 'reseller') {
      const index = splitterConnection.parent.childrens.findIndex((item) => {
        return item.child.toString() === splitterConnection._id.toString();
      });

      if (index === -1) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid splitter connection id',
        });
      }

      await splitterConnection.parent.childrens.splice(index, 1);
      await splitterConnection.parent.save();
      await splitterConnection.remove();
    } else if (splitterConnection.parent.type === 'localFiber') {
      const index = splitterConnection.parent.childrens.findIndex((item) => {
        return item.child.toString() === splitterConnection._id.toString();
      });

      if (index === -1) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid splitter connection id',
        });
      }

      splitterConnection.parent.childrens.splice(index, 1);
      splitterConnection.parent.totalConnected--;

      // ! deleting from main fiber
      if (splitterConnection.parent.mainLocalFiber) {
        const { mainLocalFiber } = await splitterConnection.parent.populate(
          'mainLocalFiber'
        );
        const indexMain = mainLocalFiber.childrens.findIndex((item) => {
          return item.child.toString() === splitterConnection._id.toString();
        });

        if (indexMain === -1) {
          return res.status(400).json({
            status: 'error',
            message: 'Invalid splitter connection id',
          });
        }

        mainLocalFiber.childrens.splice(indexMain, 1);
        mainLocalFiber.totalConnected--;
        await mainLocalFiber.save();
      }

      // ! deleting from olt
      if (!splitterConnection.reseller) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid reseller id',
        });
      }

      const resellerChildIndex =
        splitterConnection.reseller.childrens.findIndex((item) => {
          return item.child.toString() === splitterConnection._id.toString();
        });

      splitterConnection.reseller.childrens.splice(resellerChildIndex, 1);

      // ! deleting marker from local fiber
      const markerPoint = splitterConnection.parent.markers.findIndex(
        (item) => {
          return (
            item.coordinates[0] ===
            splitterConnection.location.coordinates[0][0]
          );
        }
      );

      if (markerPoint !== -1) {
        if (
          splitterConnection.parent.markers[markerPoint].totalConnected === 1
        ) {
          splitterConnection.parent.markers.splice(markerPoint, 1);
        } else {
          splitterConnection.parent.markers[markerPoint].totalConnected--;
        }
      } else {
        return res.status(400).json({
          status: 'error',
          message: 'parent connection does not have this child',
        });
      }

      await splitterConnection.reseller.save();
      await splitterConnection.parent.save();
      await splitterConnection.remove();
    } else if (splitterConnection.parentType === 'splitter') {
      const index = splitterConnection.parent.childrens.findIndex((item) => {
        return item.child.toString() === splitterConnection._id.toString();
      });

      if (index === -1) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid splitter connection id',
        });
      }

      splitterConnection.parent.childrens.splice(index, 1);
      splitterConnection.parent.splitterUsed--;

      await splitterConnection.parent.save();
      await splitterConnection.remove();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid parentType',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'splitter connection deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
