const sessionModel = require("../Model/SessionModel");
const mongoose = require("mongoose");
const paymentModel = require("../Model/PaymentModel");
const SportsComplex = require("../Model/SportsComplexModel");

function countEntriesInTimeSlot(result, startHour, endHour) {
  let count = 0;

  result.forEach((ele) => {
    const entryTime = ele.enrolls.entry;
    // const timezoneOffset = entryTime.getTimezoneOffset();

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

    if (entryTime >= startTime && entryTime < endTime) {
      count++;
    }
  });

  return count;
}

module.exports.timeSlotUtilization = async function (req, res) {
  try {
    let data;
    if (req.query.sportsComplexId) {
      data = await sessionModel.aggregate([
        {
          $match: {
            sportscomplex: new mongoose.Types.ObjectId(
              req.query.sportsComplexId
            ),
          },
        },
        {
          $unwind: "$enrolls",
        },
      ]);
    } else {
      data = await sessionModel.aggregate([
        {
          $unwind: "$enrolls",
        },
      ]);
    }
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
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.sportCapacityUtilization = async function (req, res) {
  try {
    const sportComplex = await SportsComplex.findOne({
      _id: req.query.sportsComplexId,
    }).populate("sports.sport");

    const mappedSports = sportComplex.sports.map((sportItem) => {
      const { sport, images, rating, fees, capacity } = sportItem;
      // You can perform additional mapping or processing here if needed
      return {
        sport: sport.SportName,
        capacity: capacity,
      };
    });

    mappedSports.sort((a, b) => {
      const sportA = a.sport.toUpperCase();
      const sportB = b.sport.toUpperCase();
      return sportA.localeCompare(sportB);
    });

    const counts = await paymentModel.aggregate([
      {
        $match: {
          sportsComplexId: new mongoose.Types.ObjectId(
            req.query.sportsComplexId
          ),
        },
      },
      {
        $group: {
          _id: "$sports",
          totalAthelete: { $sum: 1 }, // You can use other aggregation operators based on your requirements
        },
      },
      {
        $lookup: {
          from: "sports", // Replace with the actual name of your sports collection
          localField: "_id",
          foreignField: "_id",
          as: "sportDetails",
        },
      },
      {
        $unwind: "$sportDetails",
      },
      {
        $project: {
          sport: "$sportDetails.SportName",
          totalAthelete: 1,
        },
      },
    ]);

    counts.sort((a, b) => {
      const sportA = a.sport.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      const sportB = b.sport.toUpperCase();
      return sportA.localeCompare(sportB);
    });

    let data = [];
    for (let i = 0; i < counts.length; i++) {
      //   const element = [i];
      data.push({
        capacity: mappedSports[i].capacity,
        sport: counts[i].sport,
        totalAthelete: counts[i].totalAthelete,
      });
    }

    res.json({
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};
