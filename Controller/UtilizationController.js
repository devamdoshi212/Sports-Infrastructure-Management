const sessionModel = require("../Model/SessionModel");
const mongoose = require("mongoose");

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


module.exports.sportUtilization=async function (req,res){}