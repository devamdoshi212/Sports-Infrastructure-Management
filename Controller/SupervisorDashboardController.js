const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
// const SportsComplexModel = require("../Model/SportsComplexModel");
const instructerModel = require("../Model/instructorModel");
const paymentModel = require("../Model/PaymentModel");
const complaintModel = require("../Model/ComplaintModel");
const sessionModel = require("../Model/SessionModel");

module.exports.SportsComplexDetail = async function (req, res) {
  try {
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

    // console.log(SportsData);
    // console.log(SportsData[0].sports[0].sport);

    // console.log("SportsData => "+SportsData);
    // console.log("SportData length => "+SportsData.length);
    // console.log("SportData's sport length =>" + SportsData.sports.length);

    // for (let i=0; i < SportsData.length; i++){
    //   console.log(SportsData[i].sports[i].sport.SportName)
    // }

    // let SportsNames = [];
    // for (let i=0; i < SportsData.length; i++) {
    //   const sportsName = SportsData.map(
    //     (item) => item.sports[i].sport.SportName
    //   );
    //   console.log(sportsName);
    //  SportsNames = SportsNames.concat(sportsName);

    // }
    // console.log("SportNames => "+SportsNames)

    //Complain count using level , status and sportcomplexid
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
      // {
      //   $project: {
      //     // Paymentcount: 1,
      //   },
      // },
    ]);

    const presentCount = await sessionModel.aggregate([
      {
        $match: {
          sportscomplex: mongoose.Types.ObjectId(req.query.sportsComplex),
          date: {
            $gte: new Date(date),
            $lt: new Date(date).setDate(new Date(date).getDate() + 1),
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
    
    console.log("presentCOunr:" + presentCount);
    res.json({
      athleteCount: athleteCount.length,
      athletePaymentCount: athleteCount,
      instructerData: insName,
      instructerCount: insName.length,
      present: presentCount,
      ComplainCount: complaintcount,
      availableSports: SportsNames,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
  }
};
