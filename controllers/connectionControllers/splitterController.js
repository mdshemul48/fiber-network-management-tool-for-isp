const resellerConnectionModel = require('../../model/resellerConnectionModel.js');
const splitterConnectionModel = require('../../model/splitterConnectionModel.js');
const localFiberConnectionModel = require('../../model/localFiberConnectionModel.js');
exports.createSplitterConnection = async (req, res) => {
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
    return [item.lat, item.lng];
  });

  let reseller;
  if (parentType === 'reseller') {
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
        (item.color === color || item.portNo === parseInt(portNo))
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
    const localFiber = await localFiberConnectionModel.findById(parent);
    if (!localFiber) {
      return res.json({
        status: 'error',
        message: 'Invalid localFiber id',
      });
    }

    const reseller = await resellerConnectionModel.findById(
      localFiber.parent.toString()
    );
    if (!reseller) {
      return res.json({
        status: 'error',
        message: 'Invalid reseller id',
      });
    }

    const alreadyExistSplitter = reseller.childrens.find((item) => {
      return (
        item.connectionType === 'splitter' &&
        (item.color === color || item.portNo === parseInt(portNo))
      );
    });

    if (alreadyExistSplitter) {
      return res.status(400).json({
        status: 'error',
        message:
          'localFiber already has a splitter with the same color or port number',
      });
    }

    const splitterConnection = await splitterConnectionModel.create({
      parentType: 'localFiber',
      parent: localFiber._id,
      reseller: reseller._id,
      name,
      splitterLimit,
      portNo,
      location: {
        coordinates: coordinatesLatLngArr,
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
  }
};
