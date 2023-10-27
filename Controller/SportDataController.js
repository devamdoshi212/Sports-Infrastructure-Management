const SportModel = require("../Model/SportModel");

module.exports.AddSport = async function (req, res) {
    let Sport = new SportModel(req.body);
  
    let data = await Sport.save();
  
    res.json({ data: data, msg: "Sport Added", rcode: 200 });
  };
  