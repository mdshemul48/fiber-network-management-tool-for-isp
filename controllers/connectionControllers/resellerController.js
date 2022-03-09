const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

const resellerConnectionModel = require('../../model/resellerConnectionModel.js');

exports.createResellerConnection = async (req, res) => {
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
};
