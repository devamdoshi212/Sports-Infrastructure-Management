const SportsComplex = require("../Model/SportsComplexModel");
const ComplaintModel = require("../Model/ComplaintModel");

module.exports.getAuthorityComplaint = async function (req, res) {
  let districtid = req.query.DistrictId;

  let data = await SportsComplex.find({ district: districtid });
  //   console.log(data);
  let compalintdataarray = [];
  let compalintdataarraystatus0 = [];
  let compalintdataarraystatus1 = [];

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let compalintdata = await ComplaintModel.find({
      sportsComplex: element._id,
    });
    let complaintdata1 = await ComplaintModel.find({
      sportsComplex: element._id,
      status: 0,
    });
    let complaintdata2 = await ComplaintModel.find({
      sportsComplex: element._id,
      status: 1,
    });

    compalintdataarray.push(compalintdata);
    compalintdataarraystatus0.push(complaintdata1);
    compalintdataarraystatus1.push(complaintdata2);
  }

  if (data) {
    res.json({
      data: compalintdataarray,
      status0: compalintdataarraystatus0,
      status1: compalintdataarraystatus1,
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
