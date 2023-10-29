const mongoose = require("mongoose");
const sessions = require("../Model/SessionModel");

module.exports.addSession = async function (req, res) {
  let session = new sessions(req.body);
  console.log(session);
  let data = await session.save();
  res.json({
    data: data,
    msg: "session adeed",
    rcode: 200,
  });
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
