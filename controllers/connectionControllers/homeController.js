const homeConnectionModel = require('../../model/homeConnectionModel.js');
const splitterConnectionModel = require('../../model/splitterConnectionModel.js');

exports.createHomeConnection = async (req, res) => {
  const { parent, name, coordinates, onuNo, color } = req.body;

  const coordinatesLatLngArr = coordinates.map((item) => {
    return [item.lat, item.lng];
  });

  const splitter = await splitterConnectionModel.findById(parent);

  if (!splitter) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid splitter id',
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
    location: {
      coordinates: coordinatesLatLngArr,
    },
  });

  splitter.childrens.push({
    connectionType: 'home',
    child: newHomeConnection._id,
    color,
  });

  splitter.save();

  return res.status(201).json({
    status: 'success',
    data: newHomeConnection,
  });
};
