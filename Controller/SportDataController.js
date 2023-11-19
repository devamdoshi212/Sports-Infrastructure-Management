const SportModel = require("../Model/SportModel");

module.exports.AddSport = async function (req, res) {
  //console.log(req.file);
  const BaseUrl = `http://localhost:9999/uploads/${req.file.originalname}`;
  //console.log(BaseUrl);
  req.body.baseUrl = BaseUrl;

  let Sport = new SportModel({
    SportName: req.body.SportName,
    Category: req.body.Category,
    baseUrl: req.body.baseUrl,
    parameters: req.body.parameters.split(","),
  });
  let data = await Sport.save();

  res.json({ data: data, msg: "Sport Added", rcode: 200 });
};

module.exports.getSport = function (req, res) {
  if (req.query.Category) {
    SportModel.find({ Category: req.query.Category })
      .then((data) => {
        res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
      })
      .catch((err) => {
        res.json({ data: err.msg, msg: "smw", rcode: 200 });
      });
  } else {
    SportModel.find()
      .then((data) => {
        res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
      })
      .catch((err) => {
        res.json({ data: err.msg, msg: "smw", rcode: 200 });
      });
  }
};
