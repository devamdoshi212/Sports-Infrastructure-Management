const ComplaintModel = require("../Model/ComplaintModel");
const athleteModel = require("../Model/athleteModel");
const { sendPushNotification } = require("../PushNotification");
const { setReminder } = require("../SetReminder");

module.exports.addComplaint = async function (req, res) {
  // console.log("file detail => " + req.file);
  // const BaseUrl = `http://localhost:9999/Complains/${req.file.originalname}`;
  const BaseUrl = `${req.file.originalname}`;

  req.body.photo = BaseUrl;

  let Complaint = new ComplaintModel(req.body);

  let data = await Complaint.save();

  // console.log(data);

  res.json({ data: data, msg: "Complaint Generated", rcode: 200 });
};

module.exports.addComplaintApp = async function (req, res) {
  // console.log("file detail => " + req.file);
  // const BaseUrl = `http://localhost:9999/Complains/${req.file.originalname}`;
  // const BaseUrl = `${req.file.originalname}`;

  // req.body.baseUrl = BaseUrl;

  let Complaint = new ComplaintModel(req.body);

  let data = await Complaint.save();
  if (req.body.level === 0) {
    let Supervisor = await athleteModel
      .findOne({ userId: req.body.userId })
      .populate("createdBy");
    if (Supervisor.createdBy !== undefined) {
      setReminder(Date.now(), "Click to View..", "Athlete Raised Complaint", [
        Supervisor.createdBy,
      ]);
    }
  }
  console.log(data);

  res.json({ data: data, msg: "Complaint Generated", rcode: 200 });
};

module.exports.getAllComplaints = async function (req, res) {
  ComplaintModel.find(req.query)
    .populate("userId")
    .populate("type")
    .populate({
      path: "remarks",
      populate: {
        path: "userId",
      },
    })
    .then((data) => {
      res.json({ data: data, msg: "Complaint Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getAllComplaintsAdmin = async function (req, res) {
  ComplaintModel.find(req.query)
    .populate("userId")
    .populate("type")
    .populate({
      path: "sportsComplex",
      populate: {
        path: "district",
      },
    })
    .populate({
      path: "remarks",
      populate: {
        path: "userId",
      },
    })
    .then((data) => {
      res.json({ data: data, msg: "Complaint Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.updateComplaint = async function (req, res) {
  const id = req.params.id;
  let Complaint = await ComplaintModel.findOne({ _id: id }).populate("userId");
  let remark = req.body.remark;
  let userId = req.body.userId;
  let currentLevel = Complaint.level;
  if (req.body.status !== undefined) {
    Complaint.status = req.body.status;
    if (req.body.status === 1) {
      setReminder(
        Date.now(),
        "Let us know about are you satisfied or not!",
        "Your Complaint Solved",
        [Complaint.userId]
      );
    }
  }

  if (req.body.level !== undefined) {
    Complaint.level = req.body.level;

    if (req.body.level > 0 && Complaint.status === 0) {
      setReminder(Date.now(), "Click here...", "Your Complaint Forwarded", [
        Complaint.userId,
      ]);
    }
  }
  try {
    Complaint.remarks.push({
      date: new Date(),
      level: currentLevel,
      userId: userId,
      remark: remark,
    });
    let response = await Complaint.save();
    res.json({
      data: response,
      msg: "Complaint updated successfully",
      rcode: 200,
    });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.updateComplaintAthleteResponse = async function (req, res) {
  const id = req.params.id;
  let Complaint = await ComplaintModel.findOne({ _id: id });
  let s = req.body.satisfied;

  try {
    Complaint.satisfied = s;
    let response = await Complaint.save();
    res.json({
      data: response,
      msg: "Athelte Response of Complaint added successfully",
      rcode: 200,
    });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};


module.exports.getComplaintsAdmin = async function (req, res) {
  try {

    let query={}
    query.status=req.query.status
    let from=new Date(req.query.from)
    let to=new Date(req.query.to)
    if(req.query.from && req.query.to)
    {
      query.createdAt={ $gte: from, $lt: to}
    }
    console.log(from)
    console.log(to)

    let data=await ComplaintModel.find(query)
    .populate("userId")
    .populate("type")
    .populate({
      path: "remarks",
      populate: {
        path: "userId",
      },
    }).populate({
      path: "sportsComplex",
      populate: {
        path: "district",
      },
    })

    res.json({ 
      result:data.length,
      data: data, 
      msg: "Complaint Retrived", 
      rcode: 200 
    })
  } catch (err) {
    console.log(err)
    res.json(
      { data: err.msg, msg: "smw", rcode: -9 });
  }
  
};
