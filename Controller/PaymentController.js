const PaymentModel = require("../Model/PaymentModel");
const athleteModel = require("./../Model/athleteModel");
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
