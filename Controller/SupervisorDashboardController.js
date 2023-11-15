const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
const sessionModel = require("../Model/SessionModel");

const instructerModel = require("../Model/instructorModel");
const paymentModel = require("../Model/PaymentModel");
const complaintModel = require("../Model/ComplaintModel");

module.exports.SupervisorDasboardCount = async function (req, res) {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999);

  const presentCount = await sessionModel.aggregate([
    {
      $match: {
        sportscomplex: new mongoose.Types.ObjectId(req.query.sportsComplex),
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        }, // Match date within the given day
      },
    },
    {
      $unwind: "$enrolls",
    },
    {
      $group: {
        _id: "$enrolls.userId",
        count: { $sum: 1 },
      },
    },
  ]);

  console.log(presentCount.length);

  const instructerData = await instructerModel
    .find({
      SportComplexId: req.query.sportsComplex,
    })
    .populate("userId");
  console.log(instructerData);
  const insName = instructerData.map((doc) => doc.userId.Name);

  console.log("insname => " + insName);

  const SportsData = await SportsComplex.find({
    _id: req.query.sportsComplex,
  }).populate("sports.sport");

  const complaintcount = await complaintModel.find({
    $and: [
      { sportsComplex: req.query.sportsComplex },
      { level: 0 },
      { status: 0 },
    ],
  });

  let SportsNames = [];

  //sportdata 1 j hoy every time
  for (let i = 0; i < SportsData.length; i++) {
    for (let j = 0; j < SportsData[i].sports.length; j++) {
      const sportsName = SportsData[i].sports[j].sport.SportName;
      SportsNames.push(sportsName);
    }
  }

  // console.log("hueh");
  console.log("SportNames =>", SportsNames);

  const athleteCount = await paymentModel.aggregate([
    {
      $match: {
        sportsComplexId: new mongoose.Types.ObjectId(req.query.sportsComplex),
      },
    },
    {
      $group: {
        _id: "$athleteId",
        Paymentcount: { $sum: 1 },
      },
    },
  ]);

  res.json({
    athleteCount: athleteCount.length,
    athletePaymentCount: athleteCount,
    instructerData: insName,
    instructerCount: insName.length,
    ComplainCount: complaintcount,
    availableSports: SportsNames,
    presentCount: presentCount,
    rcode: 200,
  });
};
