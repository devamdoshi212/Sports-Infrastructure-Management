const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
const paymentModel = require("../Model/PaymentModel");
// const SportsComplexModel = require("../Model/SportsComplexModel");
const instructerModel = require("../Model/instructorModel");
const complaintModel = require("../Model/ComplaintModel");

module.exports.getDetails = async function (req, res) {
  const sportcomplex = await SportsComplex.find({
    district: new mongoose.Types.ObjectId(req.query.districtId),
  });

  console.log(sportcomplex);

  let sportComlexUser = [];
  console.log(sportcomplex[0]._id);

  for (let i = 0; i < sportcomplex.length; i++) {
    const athleteCount = await paymentModel.aggregate([
      {
        $match: {
          sportsComplexId: sportcomplex[i]._id,
        },
      },
      {
        $group: {
          _id: "$athleteId",
          Paymentcount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          Paymentcount: 1,
        },
      },
    ]);
    // console.log(athleteCount);
    sportComlexUser.push({
      sportComplex: sportcomplex[i].name,
      athleteCount: athleteCount.length,
    });
  }

  let sportComlexComplaint = [];
  //   console.log(sportcomplex[0]._id);

  for (let i = 0; i < sportcomplex.length; i++) {
    const complaintCount = await complaintModel.aggregate([
      {
        $match: {
          sportsComplex: sportcomplex[i]._id,
        },
      },
      {
        $group: {
          _id: "$status",
          Complaintcount: { $sum: 1 },
        },
      },
      //   {
      //     $project: {
      //       _id: 1,
      //       Complaintcount: 1,

      //     },
      //   },
    ]);
    complaintCount.sort((a, b) => a._id - b._id);
    console.log(complaintCount);
    if (complaintCount.length > 0) {
      sportComlexComplaint.push({
        sportComplex: sportcomplex[i].name,
        complaintCount: complaintCount.length,
        solvedComplaint: complaintCount[1].Complaintcount,
        activeComplaint: complaintCount[0].Complaintcount,
      });
    } else {
      sportComlexComplaint.push({
        sportComplex: sportcomplex[i].name,
        complaintCount: complaintCount.length,
        solvedComplaint: 0,
        activeComplaint: 0,
      });
    }
  }

  res.json({
    sportComplexCount: sportcomplex.length,
    // sportcomplex: sportcomplex,
    athleteCount: sportComlexUser,
    complaintCount: sportComlexComplaint,
    rcode: 200,
  });
};
