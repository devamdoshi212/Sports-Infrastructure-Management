const sessions = require("../Model/SessionModel");
module.exports.addSession = async function (req, res) {
  let existingSession = await sessions.findOne(
    {
      sportscomplex: req.params.id,
    },
    null,
    { sort: { createdAt: -1 } }
  );
  console.log(existingSession);

  let check = false;
  if (existingSession) {
    const testcurrentDate = new Date();
    const testexistingSessionDate = new Date(existingSession.createdAt);
    const currentDate = testcurrentDate.toISOString().split("T")[0]; // Extract the date part
    const existingSessionDate = testexistingSessionDate
      .toISOString()
      .split("T")[0]; // Extract the date part

    console.log("1 => " + existingSessionDate);
    console.log("2 => " + currentDate);
    check = existingSessionDate === currentDate ? true : false;
  }
  // console.log(existingSession);
  // console.log(isToday(existingSession.createdAt));

  if (existingSession && check) {
    //if sportComplex's Session Exist
    const currentUser = req.body.userId;

    const currentUserEnroll = existingSession.enrolls.filter(
      (enroll) => enroll.userId == req.body.userId
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
        rcode: 201,
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
  try {
    let sportscomplex = req.query.sportscomplex;
    let date = new Date(req.query.date);
    date.setHours(0, 0, 0, 0);
    let night12 = new Date(date.getTime() + 86400000);
    const data = await sessions
      .find({
        sportscomplex: sportscomplex,
        date: { $gte: date, $lt: night12 },
      })
      .populate("sportscomplex")
      .populate("enrolls.userId");
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
