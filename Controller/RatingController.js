const RatingModel = require("../Model/RatingModel");
const SportsComplexModel = require("../Model/SportsComplexModel");

module.exports.addRating = async function (req, res) {
  let athleteId = req.query.athleteId;
  let sportId = req.query.sportId;
  let sportsComplexId = req.query.sportsComplexId;
  let remarks = req.query.remarks;
  let rating = req.query.rating;
  let oldRating = await RatingModel.findOne({
    athleteId,
    sport: sportId,
    sportComplex: sportsComplexId,
  });
  let count = await RatingModel.count({
    sport: sportId,
    sportComplex: sportsComplexId,
  });
  let sportComplex = await SportsComplexModel.findOne({ _id: sportsComplexId });
  sportComplex.sports.forEach((ele) => {
    if (ele.sport.toString() == sportId) {
      if (oldRating) {
        let oldNumber = oldRating.rating;
        ele.rating =
          (ele.rating * count - oldNumber + parseInt(rating)) / count;
        oldRating.rating = rating;
      } else {
        if (ele.rating) {
          ele.rating = (ele.rating * count + parseInt(rating)) / (count + 1);
        } else {
          ele.rating = rating;
        }
      }
      return;
    }
  });
  if (!oldRating) {
    oldRating = new RatingModel({
      sport: sportId,
      athleteId: athleteId,
      rating: rating,
      sportComplex: sportsComplexId,
      remarks: remarks,
    });
  }
  await sportComplex.save();
  await oldRating.save();

  res.json({ msg: "Rating added successfully", rcode: 200 });
};

module.exports.getAllRatings = async function (req, res) {
  RatingModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Rating Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
