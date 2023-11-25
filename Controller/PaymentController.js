const PaymentModel = require("../Model/PaymentModel");
const { setReminder } = require("../SetReminder");
const athleteModel = require("./../Model/athleteModel");
const SportsComplexModel = require("./../Model/SportsComplexModel");
const SportComplex = require("./../Model/SportsComplexModel");
const mongoose = require("mongoose");
module.exports.addPayment = async function (req, res) {
  let Payment = new PaymentModel(req.body);

  let data = await Payment.save();
  let athlete = await athleteModel
    .findOne({ _id: data.athleteId })
    .populate("userId");
  // console.log(athlete);
  athlete.createdBy = req.body.supervisorId;
  athlete.payments.push(data._id);
  let data1 = await athlete.save();
  // console.log(data1);
  if (athlete.userId) {
    setReminder(
      Date.now(),
      "Congratulations!!!",
      "You are Added in Sports Complex",
      athlete.userId
    );
  }
  res.json({
    data: data,
    data1: data1,
    msg: "Payment Generated",
    rcode: 200,
  });
};

module.exports.getAllPayments = async function (req, res) {
  PaymentModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Payment Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.getAllPaymentswithsportwithinstructor = async function (
  req,
  res
) {
  const convertMonthsToDays = (months, startdate) => {
    // Get the current date

    const today = new Date();
    // Calculate future date based on months
    const futureDate = new Date(startdate);
    futureDate.setMonth(startdate.getMonth() + months);

    let timeDifference;
    // Calculate the difference in milliseconds
    if (startdate.getTime() - today.getTime() > 0) {
      timeDifference = futureDate - startdate;
    } else {
      timeDifference = futureDate - today;
    }

    // Convert milliseconds to days
    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    console.log(days);
    return days;
  };

  const d = await PaymentModel.find(req.query)
    .populate("sports")
    .populate({
      path: "instructorId",
      populate: {
        path: "userId",
      },
    });
  const data = d.filter(
    (obj) => convertMonthsToDays(obj.duration, obj.from) >= 0
  );
  res.json({ data: data, msg: "Payment Retrived", rcode: 200 });
};

// .populate("instructorId")
// .populate("instructorId.userId")

module.exports.updatePayment = async function (req, res) {
  const id = req.params.id;
  let Payment = await PaymentModel.findOne({ _id: id });

  if (req.body.duration !== undefined) {
    Payment.duration = req.body.duration;
  }

  if (req.body.timeSlot !== undefined) {
    Payment.timeSlot = req.body.timeSlot;
  }

  try {
    let response = await Payment.save();
    res.json({
      data: response,
      msg: "payment updated successfully",
      rcode: 200,
    });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.CountOFAllPaymentswithsportwithinstructor = async function (
  req,
  res
) {
  try {
    let data = await PaymentModel.aggregate([
      {
        $match: {
          sportsComplexId: new mongoose.Types.ObjectId(
            req.query.sportsComplexId
          ), // Replace with the sports complex ID you want to match
        },
      },
      {
        $group: {
          _id: "$athleteId", // Group by userId (athleteId)
          paymentCount: { $sum: 1 },
          payments: { $push: "$$ROOT" }, // Store the original payment documents in an array
        },
      },
      {
        $lookup: {
          from: "athletes", // The name of the "sports" collection
          localField: "payments.athleteId", // Field in the "payments" array
          foreignField: "_id", // Field in the "sports" collection
          as: "athleteData",
        },
      },
      {
        $lookup: {
          from: "users", // The name of the "sports" collection
          localField: "athleteData.userId", // Field in the "payments" array
          foreignField: "_id", // Field in the "sports" collection
          as: "userData",
        },
      },
      {
        $lookup: {
          from: "sports", // The name of the "sports" collection
          localField: "payments.sports", // Field in the "payments" array
          foreignField: "_id", // Field in the "sports" collection
          as: "sportsData",
        },
      },
      {
        $lookup: {
          from: "instructors", // The name of the "instructors" collection
          localField: "payments.instructorId", // Field in the "payments" array
          foreignField: "_id", // Field in the "instructors" collection
          as: "instructorData",
        },
      },
      {
        $project: {
          _id: 0, // Keep the original _id field
          athleteId: "$_id", // Create a new field named athleteId and assign the value of _id to it
          paymentCount: 1,
          sports: "$sportsData", // Include the sports data
          instructor: "$instructorData", // Include the instructor data
          athlete: "$athleteData",
          user: "$userData",
        },
      },
    ]);
    res.json({
      results: data.length,
      data: data,
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

module.exports.getPaymentTimeslotCount = async (req, res) => {
  let sports = req.query.sports;
  let sportsComplex = req.query.sports;
  let timeSlotFrom = req.query.sports;
  let timeSlotTo = req.query.To;
  let payment = await PaymentModel.find({
    sportsComplexId: "654a07e68d14ca1d77041c04",
    sports: "654a743edf5e36e891e63626",
  });
  // let sport = await SportsComplexModel.find({
  //   _id: "654a07e68d14ca1d77041c04",
  // });
  let paymentdata = [];
  payment.forEach((ele) => {
    let date = new Date(ele.from);
    let day = date.getDate();
    console.log("====================================");
    console.log(date);
    console.log("====================================");
    let now = new Date();
    let nday = now.getDate();
    let nmonth = now.getMonth();
    let nyear = now.getFullYear();
    let duration = 30 * ele.duration;

    if (
      ele.timeSlot.from == "10:00 AM" &&
      ele.timeSlot.to == "3:00 PM" &&
      (date - now) / 86400000 + duration > 0
    ) {
      paymentdata.push(ele);
    }
  });
  console.log("====================================");
  console.log(paymentdata);
  console.log("====================================");
  console.log(paymentdata.length);
};

module.exports.getAthletePayments = async (req, res) => {
  let athleteId = req.query.athleteId;
  let payment = await PaymentModel.find({ athleteId: athleteId })
    .populate("sportsComplexId")
    .populate("sports")
    .populate({
      path: "athleteId",
      populate: { path: "userId", model: "users", select: { Name: 1 } },
    });
  let myObj = [];
  payment.forEach((ele) => {
    let to = new Date(
      new Date(ele.from).setMilliseconds(1000) + ele.duration * 2629746000
    );
    let amount = 0;
    ele.sportsComplexId.sports.forEach((sp) => {
      if (sp.sport.toString() == ele.sports._id.toString()) {
        amount = ele.duration * sp.fees;
        return;
      }
    });
    myObj.push({
      sportName: ele.sports.SportName,
      sportComplexName: ele.sportsComplexId.name,
      from: ele.from,
      to,
      athleteName: ele.athleteId.userId.Name,
      amount,
    });
  });
  res.json({ rcode: 200, payments: myObj });
};
