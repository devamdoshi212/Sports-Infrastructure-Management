const SportsComplexModel = require("./../Model/SportsComplexModel");
const SportModel = require("./../Model/SportModel");
module.exports.filtersportsforcomplex = async function (req, res) {
  const id = req.params.id;

  let SportsComplex = await SportsComplexModel.findOne({ _id: id });
  const removeId = await SportsComplex.sports.map((item) => item.sport);

  console.log(removeId);
  let FilterSports = await SportModel.find({ _id: { $nin: removeId } });

  try {
    res.json({
      data: FilterSports,
      msg: "filter successfully",
      rcode: 200,
    });
  } catch (error) {
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};
