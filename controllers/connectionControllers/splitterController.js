const resellerConnectionModel = require('../../model/resellerConnectionModel.js');
const splitterConnectionModel = require('../../model/splitterConnectionModel.js');

exports.createSplitterConnection = async (req, res) => {
  const {
    parent,
    parentType,
    name,
    type,
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
      name,
      splitterLimit,
      color,
      portNo,
      location: {
        coordinates: coordinatesLatLngArr,
      },
    });

    reseller.childrens.push({
      color,
      portNo,
      connectionType: 'splitter',
      child: splitterConnection._id,
    });
    reseller.save();
  }

  console.log(req.body);
  res.send('gggs');
};
