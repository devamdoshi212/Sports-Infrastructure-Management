const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
const paymentModel = require("../Model/PaymentModel");
const instructerModel = require("../Model/instructorModel");
const complaintModel = require("../Model/ComplaintModel");
const athleteModel = require("../Model/athleteModel");
const userModel = require("../Model/UsersModel");
// const sessionModel = require("../Model/SessionModel");

module.exports.AdminViewDetails = async function (req, res) {
  try {
    let sports = await sportModel.find();
    let sportsComplex = await SportsComplex.find();
    let athlete = await athleteModel.find();
    let instructor = await instructerModel.find();
    let allUsers = await userModel.find();
    const manager = allUsers.filter((user) => user.Role === 3);
    const supervisor = allUsers.filter((user) => user.Role === 1);
    const complaints = await complaintModel.find();
    const activeComplaints = complaints.filter(
      (ele) => ele.status === 0 && ele.level === 3
    );
    const solvedComplaints = complaints.filter((ele) => ele.status === 1);

    const satisfiedCount = await complaintModel.find({
      satisfied: 1,
      status: 1,
    });
    const unsatisfiedCount = await complaintModel.find({
      satisfied: 0,
      status: 1,
    });

    res.json({
      totalSports: sports.length,
      totalComplex: sportsComplex.length,
      totalathlete: athlete.length,
      totalinstructer: instructor.length,
      totalmanager: manager.length,
      totalsupervisor: supervisor.length,
      totalcomplaints: complaints.length,
      activecomplaints: activeComplaints.length,
      solvedComplaints: solvedComplaints.length,
      unsatisfiedCount: unsatisfiedCount.length,
      satisfiedCount: satisfiedCount.length,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};

module.exports.sportDetailOfComplex = async function (req, res) {
  try {
    const data = await paymentModel.aggregate([
      {
        $match: {
          sportsComplexId: req.query.sportsComplexId,
        },
      },
      {
        $lookup: {
          from: "sports", // Use the actual name of your "sports" collection
          localField: "sports",
          foreignField: "_id",
          as: "sportInfo",
        },
      },
      {
        $group: {
          _id: "$sportInfo.SportName",
          userCount: { $sum: 1 }, // Count the number of payments for each sport
        },
      },
    ]);

    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.msg,
      rcode: -9,
    });
  }
};

module.exports.atheleteInSportsComplex = async function (req, res) {
  try {
    const data = await paymentModel.aggregate([
      {
        $lookup: {
          from: "sportscomplexes", // Use the actual name of your "sportscomplexes" collection
          localField: "sportsComplexId",
          foreignField: "_id",
          as: "sportsComplexInfo",
        },
      },
      {
        $unwind: "$sportsComplexInfo",
      },
      {
        $group: {
          _id: {
            sportsComplexId: "$sportsComplexInfo.name",
          },
          uniqueAthleteIds: { $addToSet: "$athleteId" },
        },
      },
      {
        $project: {
          sportsComplexId: "$_id.sportsComplexId",
          userCount: { $size: "$uniqueAthleteIds" },
        },
      },
    ]);

    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.msg,
      rcode: -9,
    });
  }
};

