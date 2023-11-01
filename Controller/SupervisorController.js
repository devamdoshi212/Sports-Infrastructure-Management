const instructorModel = require("../Model/instructorModel");

async function getInstructorForPayment(req, res) {
  let sportComplexId = req.query.sportComplexId;
  let sportId = req.query.sportId;
  let instructor = await instructorModel
    .find({ "sports.sport": sportId, SportComplexId: sportComplexId })
    .populate("userId");
  let myArr = [];

  for (let index = 0; index < instructor.length; index++) {
    const element = instructor[index];
    let timeslot = "";
    for (let i = 0; i < element.sports.length; i++) {
      const e = element.sports[i];
      if (e.sport.toString() == sportId) {
        timeslot = e.timeSlot;
      }
    }
    let obj = {
      instructorname: element.userId.Name,
      instructorid: element._id,
      timeslot: timeslot,
    };
    myArr.push(obj);
  }

  res.json({ rcode: 200, data: myArr, instructor: instructor });
}

module.exports = {
  getInstructorForPayment,
};
