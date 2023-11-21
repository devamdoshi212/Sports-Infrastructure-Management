const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
const sportModel = require("../Model/SportModel");
const paymentModel = require("../Model/PaymentModel");
const instructerModel = require("../Model/instructorModel");
const complaintModel = require("../Model/ComplaintModel");
const athleteModel = require("../Model/athleteModel");
const userModel = require("../Model/UsersModel");
const sessionModel = require("../Model/SessionModel");

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

function countEntriesInTimeSlot(result, startHour, endHour) {
  let count = 0;

  result.forEach((ele) => {
    const entryTime = ele.enrolls.entry;
    // const timezoneOffset = entryTime.getTimezoneOffset();
    console.log(entryTime);
    const startTime = new Date(
      entryTime.getFullYear(),
      entryTime.getMonth(),
      entryTime.getDate(),
      startHour,
      0,
      0,
      0
    );
    // Adjust for timezone offset
    // startTime.setMinutes(startTime.getMinutes() - timezoneOffset);
    console.log(startTime);
    const endTime = new Date(
      entryTime.getFullYear(),
      entryTime.getMonth(),
      entryTime.getDate(),
      endHour,
      0,
      0,
      0
    );
    // Adjust for timezone offset
    // endTime.setMinutes(endTime.getMinutes() - timezoneOffset);
    console.log(endTime);
    if (entryTime >= startTime && entryTime < endTime) {
      count++;
    }
  });

  return count;
}

module.exports.utilization = async function (req, res) {
  try {
    const data = await sessionModel.aggregate([
      {
        $match: {
          sportscomplex: new mongoose.Types.ObjectId(req.query.sportsComplexId),
        },
      },
      {
        $unwind: "$enrolls",
      },
    ]);
    // let slot1 = countEntriesInTimeSlot(data, 7, 9);
    // let slot2 = countEntriesInTimeSlot(data, 9, 11);
    // let slot3 = countEntriesInTimeSlot(data, 11, 13);
    // let slot4 = countEntriesInTimeSlot(data, 13, 15);
    // let slot5 = countEntriesInTimeSlot(data, 15, 17);
    // let slot6 = countEntriesInTimeSlot(data, 17, 19);
    // let slot7 = countEntriesInTimeSlot(data, 19, 24);
    // let slot8 = countEntriesInTimeSlot(data, 0, 7);
    let slotCounts = [];

    slotCounts.push(countEntriesInTimeSlot(data, 7, 9));
    slotCounts.push(countEntriesInTimeSlot(data, 9, 11));
    slotCounts.push(countEntriesInTimeSlot(data, 11, 13));
    slotCounts.push(countEntriesInTimeSlot(data, 13, 15));
    slotCounts.push(countEntriesInTimeSlot(data, 15, 17));
    slotCounts.push(countEntriesInTimeSlot(data, 17, 19));
    slotCounts.push(countEntriesInTimeSlot(data, 19, 24));
    slotCounts.push(countEntriesInTimeSlot(data, 0, 7));

    res.json({
      total: data.length,
      slotcount: slotCounts,
      // slot1: slot1,
      // slot2: slot2,
      // slot3: slot3,
      // slot4: slot4,
      // slot5: slot5,
      // slot6: slot6,
      // slot7: slot7,
      // slot8: slot8,
      // data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
