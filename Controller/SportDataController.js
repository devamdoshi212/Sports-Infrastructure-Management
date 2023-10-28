const SportModel = require("../Model/SportModel");

module.exports.AddSport = async function (req, res) {
    //console.log(req.file);
    const BaseUrl = `http://localhost:9999/uploads/${req.file.originalname}`
    //console.log(BaseUrl);
    req.body.baseUrl = BaseUrl;

    let Sport = new SportModel(req.body);
    console.log(Sport);
    let data = await Sport.save();

    res.json({ data: data, msg: "Sport Added", rcode: 200 });
};

module.exports.getSport = function (req, res) {
    SportModel.find(req.query)
        .then((data) => {
            res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
        })
        .catch((err) => {
            res.json({ data: err.msg, msg: "smw", rcode: 200 });
        });
};
