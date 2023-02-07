const pointToPointConnectionModel = require("../model/pointToPointConnectionModel");
const corporateConnectionModel = require("../model/corporateConnectionModel");
const resellerConnectionModel = require("../model/resellerConnectionModel");
const createLocalFiberModel = require("../model/localFiberConnectionModel");
const splitterConnectionModel = require("../model/splitterConnectionModel");
const homeConnectionModel = require("../model/homeConnectionModel");

exports.getAllConnection = async (req, res) => {
  const pointToPointData = await pointToPointConnectionModel.find();
  const corporateData = await corporateConnectionModel.find();
  const resellerData = await resellerConnectionModel.find();
  const localFiberData = await createLocalFiberModel
    .find()
    .populate("mainLocalFiber", "totalConnected totalCore childrens");
  const splitterData = await splitterConnectionModel.find();
  const homeData = await homeConnectionModel.find();

  return res.status(200).json({
    status: "success",
    data: [...pointToPointData, ...corporateData, ...resellerData, ...localFiberData, ...splitterData, ...homeData],
  });
};
