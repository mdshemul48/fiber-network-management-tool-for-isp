const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

// creating all the main point to point connection controller functions

exports.createPointToPointConnection = async (req, res) => {
  try {
    const { name, totalCore, coordinates } = req.body;
    const coordinatesLatLngArr = coordinates.map((item) => {
      return [item.lat, item.lng];
    });
    const createdConnection = await pointToPointConnectionModel.create({
      name: connectionName,
      totalCore,
      location: { coordinates: coordinatesLatLngArr },
      childrenConnection: [],
    });

    return res.status(201).json({
      status: 'success',
      data: createdConnection,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
