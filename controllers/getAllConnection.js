const pointToPointConnectionModel = require('../model/pointToPointConnectionModel.js');
const corporateConnectionModel = require('../model/corporateConnectionModel.js');

exports.getAllConnection = async (req, res) => {
  const pointToPointData = await pointToPointConnectionModel.find();
  const corporateData = await corporateConnectionModel.find();
  return res.status(200).json({
    status: 'success',
    data: [...pointToPointData, ...corporateData],
  });
};
