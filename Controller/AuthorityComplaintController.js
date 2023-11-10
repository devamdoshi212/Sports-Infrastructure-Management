const SportsComplex = require("../Model/SportsComplexModel");
const ComplaintModel = require("../Model/ComplaintModel");

module.exports.getAuthorityComplaint = async function (req, res) {
  let districtid = req.query.DistrictId;

  let data = await SportsComplex.find({ district: districtid });
  //   console.log(data);
  let complaintdataarray = [];
  let complaintdataarraystatus0 = [];
  let complaintdataarraystatus1 = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let complaintdata = await ComplaintModel.find({
      sportsComplex: element._id,
    });
    for (let i = 0; i < complaintdata.length; i++) {
      const e = complaintdata[i];
      complaintdataarray.push(e);
    }

    let complaintdata1 = await ComplaintModel.find({
      sportsComplex: element._id,
      status: 0,
    });
    for (let i = 0; i < complaintdata1.length; i++) {
      const e = complaintdata1[i];
      complaintdataarraystatus0.push(e);
    }

    let complaintdata2 = await ComplaintModel.find({
      sportsComplex: element._id,
      status: 1,
    });
    for (let i = 0; i < complaintdata2.length; i++) {
      const e = complaintdata2[i];
      complaintdataarraystatus1.push(e);
    }
  }

  if (data) {
    res.json({
      data: complaintdataarray,
      status0: complaintdataarraystatus0,
      status1: complaintdataarraystatus1,
      msg: "Complaint Retrived For Authority",
      rcode: 200,
    });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

// module.exports.getAllComplaints = async function (req, res) {
//     ComplaintModel.find(req.query)
//       .populate("userId")
//       .populate("type")
//       .then((data) => {
//         res.json({ data: data, msg: "Complaint Retrived", rcode: 200 });
//       })
//       .catch((err) => {
//         res.json({ data: err.msg, msg: "smw", rcode: -9 });
//       });
//   };
