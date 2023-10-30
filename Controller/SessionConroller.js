const mongoose = require("mongoose");
const sessions = require("../Model/SessionModel");

// module.exports.attenddsdance = async function (req, res) {};

module.exports.addSession = async function (req, res) {
  let existingSession = await sessions.findOne(
    {
      sportscomplex: req.params.id,
    },
    null,
    { sort: { createdAt: -1 } }
  );
  // .sort({ createdAt: -1 });
  // const testcurrentDate = new Date();
  // const testexistingSessionDate = new Date(existingSession.createdAt);
  // const currentDate = `${testcurrentDate.getFullYear()}-${String(
  //   testcurrentDate.getMonth() + 1
  // ).padStart(2, "0")}-${String(testcurrentDate.getDate()).padStart(2, "0")}`;
  // const existingSessionDate = `${testexistingSessionDate.getFullYear()}-${String(
  //   testexistingSessionDate.getMonth() + 1
  // ).padStart(2, "0")}-${String(testexistingSessionDate.getDate()).padStart(
  //   2,
  //   "0"
  // )}`;
  console.log(existingSession);
  const testcurrentDate = new Date();
  const testexistingSessionDate = new Date(existingSession.createdAt);
  const currentDate = testcurrentDate.toISOString().split("T")[0]; // Extract the date part
  const existingSessionDate = testexistingSessionDate
    .toISOString()
    .split("T")[0]; // Extract the date part

  console.log("1 => " + existingSessionDate);
  console.log("2 => " + currentDate);

  // console.log(existingSession);
  // console.log(isToday(existingSession.createdAt));

  if (existingSession && existingSessionDate === currentDate) {
    //if sportComplex's Session Exist
    const currentUser = req.body.userId;

    const currentUserEnroll = existingSession.enrolls.filter(
      (enroll) => enroll.userId.toString() == req.body.userId
    );

    console.log(currentUserEnroll);

    if (
      currentUserEnroll.length > 0 &&
      currentUserEnroll[currentUserEnroll.length - 1].exit == null
    ) {
      // Update the exit time for the user's enrollment
      currentUserEnroll[currentUserEnroll.length - 1].exit = new Date();
      let data = await existingSession.save();

      res.json({
        data: data,
        msg: "Session updated .......User comes more than one time in sportComplex",
        rcode: 200,
      });
    } else {
      const currentDate = new Date();
      const entryTime = currentDate.getTime();
      const newEnroll = {
        userId: req.body.userId,
        entry: entryTime,
        exit: null,
      };
      existingSession.enrolls.push(newEnroll);

      let data = await existingSession.save();
      res.json({
        data: data,
        msg: "User Exit from sportcomlex",
      });
    }
  } else {
    // sportComplex's Session doesn't exist, send a POST request to create

    const newSession = new sessions();
    newSession.sportscomplex = req.params.id;
    const currentDate = new Date();
    const entryTime = currentDate.getTime();
    const newEnroll = {
      userId: req.body.userId,
      entry: entryTime,
      exit: null,
    };
    newSession.enrolls.push(newEnroll);
    newSession.date = Date.now();
    let data1 = await newSession.save();
    res.json({
      data: data1,
      msg: "new entry created of Sportcomplex for today ",
      rcode: 200,
    });
  }
};

module.exports.getSession = async function (req, res) {
  sessions
    .find(req.query)
    .populate({
      path: "sportscomplex",
      model: "sportscomplexes",
    })
    .populate({
      path: "userId",
      model: "users",
    })
    .then((data) => {
      res.json({ data: data, msg: "Sessions Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: 200 });
    });
};

module.exports.attendance = async function (req, res) {
  try {
    const data = await sessions.aggregate([
      {
        $unwind: "$enrolls", // Unwind the 'enrolls' array
      },
      {
        $group: {
          _id: {
            userId: "$enrolls.userId",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          }, // Group by 'userId' and formatted 'date'}, // Group by 'userId'
          totalSessions: { $sum: 1 }, // Calculate the total number of sessions per user
        },
      },
    ]);
    res.json({
      results: data.length,
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
