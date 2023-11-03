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
      //       Paymentcount: 1,
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

module.exports.getSportsCount = async function (req, res) {
  try {
    // const sportcomplex = await //SportsComplex.find({
    //   district: new mongoose.Types.ObjectId(req.query.districtId),
    // });

    // let sports = [];

    const sportcomplex = await SportsComplex.aggregate([
      {
        $match: {
          district: new mongoose.Types.ObjectId(req.query.districtId),
        },
      },
      {
        $unwind: "$sports",
      },
      {
        $lookup: {
          from: "sports", // Use the actual name of your "sports" collection
          localField: "sports.sport",
          foreignField: "_id",
          as: "sportInfo",
        },
      },
      {
        $unwind: "$sportInfo",
      },
      {
        $group: {
          _id: "$sportInfo.SportName", // Group by the sport name
          sportComplexCount: { $sum: 1 }, // Count the number of sports complexes for each sport
        },
      },
    ]);
    // for (let i = 0; i < sportcomplex.length; i++) {
    //   const Sportsplayercount = await paymentModel.aggregate([
    //     {
    //       $match: {
    //         sportsComplexId: sportcomplex[i]._id,
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: "$sports",
    //         usercount: { $sum: 1 },
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "sports", // Replace with the actual name of your "Sports" collection
    //         localField: "_id",
    //         foreignField: "_id",
    //         as: "sportsInfo",
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 1,
    //         usercount: 1,
    //         sportsInfo: 1,
    //       },
    //     },
    //   ]);
    // console.log(athleteCount);
    // let sportsname=[];

    // const sports =  Sportsplayercount.map(
    //   (item) => item.sportCount[i].sportsInfo.SportName
    // );
    // sportsname = sports.concat(sports);
    // console.log(sportsname);

    //   const sportsData = Sportsplayercount.map((item) => ({
    //     SportName: item.sportsInfo[0].SportName,
    //     usercount: item.usercount,
    //   }));

    //   console.log(sportsData);

    //   sports.push({
    //     // sport:,
    //     // sportComplex: sportcomplex[i].name,
    //     sportCount: sportsData,
    //   });
    // }
    res.json({
      sportsCount: sportcomplex,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
      rcode: -9,
    });
  }
};
