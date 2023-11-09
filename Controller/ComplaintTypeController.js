const ComplaintTypeModel = require("./../Model/ComplaintTypeModel");

module.exports.addComplaintType = async function (req, res) {
  let ComplaintType = new ComplaintTypeModel(req.body);
  let data = await ComplaintType.save();
  res.json({ data: data, msg: "Complaint Type Added", rcode: 200 });
};

module.exports.getComplainttype = function (req, res) {
  ComplaintTypeModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Complaint Type Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
