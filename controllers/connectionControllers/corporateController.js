const pointToPointConnectionModel = require('../../model/pointToPointConnectionModel.js');

const corporateConnectionModel = require('../../model/corporateConnectionModel.js');

module.exports.createCorporateConnection = async (req, res) => {
  const { parent, name, portNo, coreColor, coordinates } = req.body;

  const parentConnection = await pointToPointConnectionModel.findById(parent);

  const coordinatesLatLngArr = coordinates.map((item) => {
    return [item.lat, item.lng];
  });

  const createdCorporateConnection = await corporateConnectionModel.create({
    parentType: parentConnection.type,
    parent: parentConnection._id.toString(),
    name,
    portNo,
    color: coreColor,
    location: { coordinates: coordinatesLatLngArr },
  });

  parentConnection.childrens.push({
    color: coreColor,
    connectionType: 'corporate',
    child: createdCorporateConnection._id.toString(),
  });

  parentConnection.totalConnected++;
  parentConnection.save();

  return res.status(201).json({
    status: 'success',
    data: createdCorporateConnection,
  });
};
