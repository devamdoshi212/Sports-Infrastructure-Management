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
  UpdatesModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Update Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: 200 });
    });
};
module.exports.getUpdatesForAthlete = async function (req, res) {
  let sportComplexId = req.query.sportComplexId;

  let data = await UpdatesModel.find();
  let updates = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (
      element.level === 0 ||
      (element.level === 2 && element.sportComplexId == sportComplexId)
    ) {
      updates.push(element);
    }
  }
  res.json({ data: updates, msg: "Update Retrived", rcode: 200 });
};

module.exports.updateUpdates = async function (req, res) {
  try {
    const _id = req.params.id;
    let active;

    let data = await UpdatesModel.findById(_id);

    if (!data) {
      return res.status(404).json({ msg: "Document not found", rcode: 404 });
    }

    if (req.body.active !== undefined) {
      active = req.body.active;
    } else {
      active = data.active;
    }

    data.active = active;

    let response = await data.save();

    res.json({ data: response, msg: "Updated", rcode: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error", rcode: 500 });
  }
};
