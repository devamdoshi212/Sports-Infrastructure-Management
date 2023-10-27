const DistrictModel = require("../Model/DistrictsModel");

module.exports.addDistrict = async function (req, res) {
  let District = new DistrictModel(req.body);

  let data = await District.save();

  res.json({ data: data, msg: "District Added", rcode: 200 });
};

module.exports.getDistrict = function (req, res) {
  DistrictModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "District Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
