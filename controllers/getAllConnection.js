const pointToPointConnectionModel = require('../model/pointToPointConnectionModel.js');
const corporateConnectionModel = require('../model/corporateConnectionModel.js');
const resellerConnectionModel = require('../model/resellerConnectionModel.js');
exports.getAllConnection = async (req, res) => {
  const pointToPointData = await pointToPointConnectionModel.find();
  const corporateData = await corporateConnectionModel.find();
  const resellerData = await resellerConnectionModel.find();
  return res.status(200).json({
    status: 'success',
    data: [...pointToPointData, ...corporateData, ...resellerData],
  });
};
