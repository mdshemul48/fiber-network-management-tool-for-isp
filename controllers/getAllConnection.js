const pointToPointConnectionModel = require('../model/pointToPointConnectionModel.js');
const corporateConnectionModel = require('../model/corporateConnectionModel.js');
const resellerConnectionModel = require('../model/resellerConnectionModel.js');
const createLocalFiberModel = require('../model/localFiberConnectionModel.js');
const splitterConnectionModel = require('../model/splitterConnectionModel.js');
const homeConnectionModel = require('../model/homeConnectionModel.js');
exports.getAllConnection = async (req, res) => {
  const pointToPointData = await pointToPointConnectionModel.find();
  const corporateData = await corporateConnectionModel.find();
  const resellerData = await resellerConnectionModel.find();
  const localFiberData = await createLocalFiberModel.find();
  const splitterData = await splitterConnectionModel.find();
  const homeData = await homeConnectionModel.find();
  return res.status(200).json({
    status: 'success',
    data: [
      ...pointToPointData,
      ...corporateData,
      ...resellerData,
      ...localFiberData,
      ...splitterData,
      ...homeData,
    ],
  });
};
