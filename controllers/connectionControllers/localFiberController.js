const localFiberConnectionModel = require('../../model/localFiberConnectionModel.js');

exports.createLocalFiberConnection = (req, res) => {
  const { name, parent, totalCore, coordinates } = req.body;
  console.log(name, parent, totalCore, coordinates);
  res.send({ status: 'gg' });
};
