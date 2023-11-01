const { default: mongoose } = require("mongoose");
const SportsComplex = require("../Model/SportsComplexModel");
// const SportsComplexModel = require("../Model/SportsComplexModel");

module.exports.AddSportsComplex = async function (req, res) {
  let SportComplex = new SportsComplex({
    name: req.body.name,
    location: req.body.location,
    district: req.body.district,
    // sports: [],
    taluka: req.body.taluka,
    area: req.body.area,
    operationalSince: req.body.operationalSince,
  });

  let data = await SportComplex.save();
  res.json({ data: data, msg: "SportComplex Added", rcode: 200 });
};

module.exports.getSportsComplex = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query);
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithdistrict = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("district");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithmanager = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("manager");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithmanagerwithdistrict = async function (
  req,
  res
) {
  let data = await SportsComplex.find(req.query)
    .populate("manager")
    .populate("district");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.getSportsComplexwithSportName = async function (req, res) {
  //req.query {manager: id}
  let data = await SportsComplex.find(req.query).populate("sports.sport");
  if (data) {
    res.json({ data: data, msg: "Sport Retrived", rcode: 200 });
  } else {
    res.json({ data: err.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.updateSportsComplex = async function (req, res) {
  const id = req.params.id;

  console.log(req.files);
  let resourcesarray = [];
  req.files.forEach((ele) => {
    resourcesarray.push(`http://localhost:9999/uploads/${ele.originalname}`);
  });

  let json = {
    sport: req.body.sport, // Replace with the actual sport ID
    images: resourcesarray,
    rating: req.body.rating,
    fees: req.body.fees,
  };

  let sportcomplex = await SportsComplex.findOne({ _id: id });
  sportcomplex.sports.push(json);
  let response = await sportcomplex.save();
  res.json({ data: response, msg: "updated successfully", rcode: 200 });
};

module.exports.SearchComplex = async function (req, res) {
  try {
    const query = req.query.q;
    var data = [];
    if (!query) {
      let data1 = await SportsComplex.find();
      return res.status(200).json({
        results: data1.length,
        data: data1,
        status: "Success",
        // data: data,ś
      });
    }

    data = await SportsComplex.aggregate([
      {
        $lookup: {
          from: "districts", // Replace with the actual name of your "districts" collection
          localField: "district",
          foreignField: "_id",
          as: "districtInfo",
        },
      },
      {
        $lookup: {
          from: "sports", // Replace with the actual name of your "Sports" collection
          localField: "sports.sport",
          foreignField: "_id",
          as: "sportsInfo",
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: `^${query}`, $options: "i" } },
            { "districtInfo.District": { $regex: `^${query}`, $options: "i" } },
            { "sportsInfo.SportName": { $regex: `^${query}`, $options: "i" } },
          ],
        },
      },
    ]);

    res.json({
      result: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.msg,
      rcode: -9,
    });
  }
};
