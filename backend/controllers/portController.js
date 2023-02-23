const PortfolioModel = require("../models/PortfolioModel");
const HttpError = require("../models/http-error");

const getformdets = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  let findDets;
  findDets = await PortfolioModel.find({ id: id });
  // console.log(findDets);

  // console.log(findDets);
  res.status(201).json(findDets);
};

const form = async (req, res, next) => {
  //   console.log(req.body);
  const { portfolio, platform, type, openingDate, images, id } = req.body;
  const existingport = await PortfolioModel.findOne({ id, portfolio });
  if (existingport) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }
  const portModel = PortfolioModel({
    portfolio,
    platform,
    type,
    openingDate,
    images,
    id,
  });
  try {
    await portModel.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Portfolio saving failed", 500);
    return next(error);
  }
  //   console.log(portModel);
  res.json(portModel);
};

const getnum = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);
  const nums = await PortfolioModel.find({ id: id });
  console.log(nums.length);
  res.json({ len: nums.length, names: nums });
};
exports.form = form;
exports.getformdets = getformdets;
exports.getnum = getnum;
