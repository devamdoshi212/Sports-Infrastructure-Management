const UpdatesModel = require("./../Model/UpdatesModel");

module.exports.addUpdates = async function (req, res) {
  const BaseUrl = `http://localhost:9999/updates/${req.file.originalname}`;
  req.body.image = BaseUrl;

  let Update = new UpdatesModel({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    level: req.body.level, //0:For All (Admin),1:For Particular District (Authority), 2:For Paticular Complex (manager)
    sportComplexId: req.body.sportComplexId,
  });

  let data = await Update.save();

  res.json({ data: data, msg: "Update Added", rcode: 200 });
};

module.exports.getUpdates = function (req, res) {
  UpdatesModel.find()
    .then((data) => {
      res.json({ data: data, msg: "Update Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: 200 });
    });
};
