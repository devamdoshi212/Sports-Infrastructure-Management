const RatingModel = require('../Model/RatingModel')

module.exports.addRating = async function (req, res) {

    let Rating = new RatingModel(req.body)

    let data = await Rating.save();

    console.log(data);

    res.json({ data: data, msg: "Rating added successfully", rcode: 200 })
}

module.exports.getAllRatings = async function (req, res) {

    RatingModel.find(req.query)
        .then((data) => {
            res.json({ data: data, msg: "Rating Retrived", rcode: 200 });
        })
        .catch((err) => {
            res.json({ data: err.msg, msg: "smw", rcode: -9 });
        });

}
