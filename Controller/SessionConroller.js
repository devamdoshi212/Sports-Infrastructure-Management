const mongoose = require("mongoose");
const sessions = require("../Model/SessionModel");

module.exports.addSession = async function (req, res) {
  let existingSession = await sessions.findOne({
    sportscomplex: req.params.id,
  });

  if (existingSession) {
    //if sportComplex's Session Exist
    const currentUser = req.body.userId;

    const currentUserEnroll = existingSession.enrolls.filter(
      (enroll) => enroll.userId.toString() === req.body.userId
    );

    console.log();

    if (
      currentUserEnroll &&
      currentUserEnroll[currentUserEnroll.length - 1].exit == null
    ) {
      // Update the exit time for the user's enrollment [gandfaad Condition]
      currentUserEnroll[currentUserEnroll.length - 1].exit = new Date();
      let data = await existingSession.save();

      res.json({
        data: data,
        msg: "Session updated",
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
        msg: "mistacle",
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
    let data1 = await newSession.save();
    res.json({
      data: data1,
      msg: "SportComplex Session added ",
      rcode: 200,
    });
  }
};

module.exports.getSession = async function (req, res) {
  sessions
    .find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Sessions Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: 200 });
    });
};

module.exports.updateSession = async function (req, res) {};
