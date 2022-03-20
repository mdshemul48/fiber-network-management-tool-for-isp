const homeConnectionModel = require('../../model/homeConnectionModel.js');
const splitterConnectionModel = require('../../model/splitterConnectionModel.js');

exports.createHomeConnection = async (req, res) => {
  const { parent, name, coordinates, onuNo, color } = req.body;
  const coordinatesLatLngArr = coordinates.map((item) => {
    return [item.lat, item.lng];
  });

  const splitter = await splitterConnectionModel
    .findById(parent)
    .populate('reseller');

  if (!splitter) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid splitter id',
    });
  }

  if (!splitter.reseller) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid reseller id',
    });
  }

  const alreadyExistColoredConnection = splitter.childrens.find(
    (item) => item.color === color
  );

  if (alreadyExistColoredConnection) {
    return res.status(400).json({
      status: 'error',
      message: 'splitter already has a colored connection',
    });
  }

  const newHomeConnection = await homeConnectionModel.create({
    parentType: 'splitter',
    parent: splitter._id,
    name,
    onuNo,
    color,
    locations: {
      coordinates: coordinatesLatLngArr,
    },
  });

  splitter.childrens.push({
    connectionType: 'home',
    child: newHomeConnection._id,
    color,
  });

  const targetSplitterInReseller = splitter.reseller.childrens.find(
    (item) => item.child.toString() === splitter._id.toString()
  );

  splitter.splitterUsed++;
  splitter.reseller.connectionUsed++;
  targetSplitterInReseller.connectionUsed++;

  splitter.save();
  splitter.reseller.save();
  return res.status(201).json({
    status: 'success',
    data: newHomeConnection,
  });
};
