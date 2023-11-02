const PaymentModel = require("../Model/PaymentModel");
const athleteModel = require("./../Model/athleteModel");
const mongoose = require("mongoose");
module.exports.addPayment = async function (req, res) {
  let Payment = new PaymentModel(req.body);

  let data = await Payment.save();
  let athlete = await athleteModel.findOne({ _id: data.athleteId });
  console.log(athlete);
  athlete.createdBy = req.body.supervisorId;
  athlete.payments.push(data._id);
  let data1 = await athlete.save();
  console.log(data1);

  res.json({ data: data, data1: data1, msg: "Payment Generated", rcode: 200 });
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
  PaymentModel.find(req.query)
    .populate("sports")
    .populate({
      path: "instructorId",
      populate: {
        path: "userId",
      },
    })
    .then((data) => {
      res.json({ data: data, msg: "Payment Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
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
            req.body.sportsComplexId
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
