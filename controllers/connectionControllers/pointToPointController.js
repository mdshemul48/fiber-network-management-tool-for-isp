const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

// creating all the main point to point connection controller functions
exports.createPointToPointConnection = async (req, res) => {
  const { connectionName, totalCore, coordinates } = req.body;
  const coordinatesLatLngArr = coordinates.map((item) => {
    return [item.lat, item.lng];
  });
  const createdConnection = await pointToPointConnectionModel.create({
    name: connectionName,
    totalCore,
    location: { coordinates: coordinatesLatLngArr },
    childrenConnection: [],
  });

  res.send({ check: createdConnection });
};
