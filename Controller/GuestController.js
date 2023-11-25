const Guest = require("../Model/GuestModel");
const instructorModel = require("../Model/instructorModel");

// Add data controller
(module.exports.addUser = async function (req, res) {
  try {
    const gus = new Guest(req.body);
    const savedGuest = await gus.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}),
  // Get all data controller
  (module.exports.getAllUsers = async function (req, res) {
    try {
      const Guests = await Guest.find(req.query).populate('SportComplexId').populate('sport');
      res.status(200).json(Guests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports.gettimeslotfrominstructor = async function (req, res) {
  try {
    let data = await instructorModel.find({
      SportComplexId: req.query.SportComplexId,
    });
    let timeslot = [];

    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      for (let j = 0; j < element.sports.length; j++) {
        const ele = element.sports[j];
        if (ele.sport.equals(req.query.sportId)) {
          timeslot = timeslot.concat(ele.timeSlot);
        }
      }
    }

    res.json({ data: timeslot, rcode: 200 });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error", rcode: 500 });
  }
};

// module.exports.gettimeslotfrominstructor = async function (req, res) {
//   let data = await instructorModel.find({
//     SportComplexId: req.query.SportComplexId,
//   });
//   let timeslot = [];

//   for (let index = 0; index < data.length; index++) {
//     const element = data[index];
//     for (let index = 0; index < element.sports.length; index++) {
//       const ele = element.sports[index];
//       if (ele === req.query.sportId) {
//         // timeslot = ele.timeSlot;
//         timeslot.push(ele.timeSlot);
//       }
//     }
//   }
//   res.json({ data: timeslot, rcode: 200 });
// };
