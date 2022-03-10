const localFiberConnectionModel = require('../../model/localFiberConnectionModel.js');
const resellerConnectionModel = require('../../model/resellerConnectionModel.js');

exports.createLocalFiberConnection = async (req, res) => {
  const { name, parent, parentType, totalCore, coordinates } = req.body;

  let selectedParent = null;
  if (parentType === 'reseller') {
    selectedParent = await resellerConnectionModel.findOne({ _id: parent });
  } else if (parentType === 'localFiber') {
    selectedParent = await localFiberConnectionModel.findOne({ _id: parent });
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
    const createLocalFiberConnection = await localFiberConnectionModel.create({
      name,
      parent: selectedParent._id,
      parentType: 'reseller',
      totalCore,
      type: 'localFiber',
      totalCore,
      markers: [
        {
          totalConnected: 1,
          type: 'Point',
          location: {
            coordinates: coordinatesLatLngArr[coordinatesLatLngArr.length - 1],
          },
        },
      ],
      locations: [
        {
          coordinates: coordinatesLatLngArr,
        },
      ],
    });

    return res.status(201).json({
      status: 'success',
      data: createLocalFiberConnection,
    });
  }
};
