const ComplaintModel = require("../Model/ComplaintModel");

module.exports.addComplaint = async function (req, res) {
  // const BaseUrl = `http://localhost:9999/Complains/${req.file.originalname}`

  //req.body.baseUrl = BaseUrl;

  let Complaint = new ComplaintModel(req.body);

  let data = await Complaint.save();

  console.log(data);

  res.json({ data: data, msg: "Complaint Generated", rcode: 200 });
};

module.exports.getAllComplaints = async function (req, res) {
  ComplaintModel.find(req.query)
    .populate("userId")
    .then((data) => {
      res.json({ data: data, msg: "Complaint Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.updateComplaint = async function (req, res) {
  const id = req.params.id;
  let Complaint = await ComplaintModel.findOne({ _id: id });
  if (req.body.Sremarks !== undefined) {
    Complaint.Sremarks = req.body.Sremarks;
  }
  if (req.body.Mremarks !== undefined) {
    Complaint.Mremarks = req.body.Mremarks;
  }
  if (req.body.Aremarks !== undefined) {
    Complaint.Aremarks = req.body.Aremarks;
  }
  if (req.body.status !== undefined) {
    Complaint.status = req.body.status;
  }

  if (req.body.level !== undefined) {
    Complaint.level = req.body.level;
  }

  try {
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
