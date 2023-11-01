const instructorModel = require("../Model/instructorModel");

async function getInstructorForPayment(req, res) {
  let sportComplexId = req.query.sportComplexId;
  let sportId = req.query.sportId;
  let instructor = await instructorModel
    .find({ "sports.sport": sportId, SportComplexId: sportComplexId })
    .populate("userId");
  let myArr = [];

  res.json({ rcode: 200, instructor });
}

module.exports = {
  getInstructorForPayment,
};
