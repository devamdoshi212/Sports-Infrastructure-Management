const AthleteModel = require("../Model/athleteModel");
const athleteRatingModel = require("../Model/athleteRatingModel");

module.exports.addAthlete = async function (req, res) {
  //console.log(req.file);
  const BaseUrl = `http://localhost:9999/Athletes/${req.file.originalname}`;
  //console.log(BaseUrl);
  req.body.baseUrl = BaseUrl;
  let Athlete = new AthleteModel(req.body);

  let data = await Athlete.save();

  console.log(data);

  res.json({ data: data, msg: "Athlete Added", rcode: 200 });
};

module.exports.getAthlete = async function (req, res) {
  const data = await AthleteModel.find(req.query).populate("userId");
  res.json({ data: data, data1: myarray, msg: "Athlete Retrived", rcode: 200 });
};
module.exports.getAthletewithRating = async function (req, res) {
  const aid = req.query.id;
  const data = await AthleteModel.find().populate("userId");
  let myarray = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let rating = await averageRating(element._id, null);
    myarray.push({
      athleteid: element._id,
      name: element.userId.Name,
      iconUrl: element.baseUrl,
      score: rating,
    });
  }
  const currentuser = myarray.filter((ele) => ele.athleteid == aid);

  myarray.sort((a, b) => b.score - a.score);

  res.json({
    data: data,
    data1: myarray,
    currentuserdata: currentuser,
    msg: "Athlete Retrived",
    rcode: 200,
  });
};
async function averageRating(userId, sportId) {
  let ratings = await athleteRatingModel.find({
    athleteId: userId,
    sport: sportId == null ? { $exists: true } : sportId,
    isEvaluated: 1,
  });
  let total = ratings.length;
  let total2 = 0;
  ratings.forEach((ele) => {
    total2 += ele.rating;
  });
  return total2 / total;
}
module.exports.getAthletewithsupervisor = async function (req, res) {
  AthleteModel.find(req.query)
    .populate("createdBy")
    .then((data) => {
      res.json({
        data: data,
        msg: "Athlete Retrived with supervisor",
        rcode: 200,
      });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getAthletewithpayments = async function (req, res) {
  AthleteModel.find(req.query)
    .populate("payments")
    .then((data) => {
      res.json({
        data: data,
        msg: "Athlete Retrived with payments",
        rcode: 200,
      });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getAthletewithpaymentswithsupervisor = async function (
  req,
  res
) {
  AthleteModel.find(req.query)
    .populate("payments")
    .populate("createdBy")
    .then((data) => {
      res.json({
        data: data,
        msg: "Athlete Retrived with payments",
        rcode: 200,
      });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.updateAthlete = async function (req, res) {
  const id = req.params.id;

  // console.log(req.files);
  // let resourcesarray = [];
  // req.files.forEach((ele) => {
  //   resourcesarray.push(`http://localhost:9999/uploads/${ele.originalname}`);
  // });

  // console.log(resourcesarray);

  // let json = {
  //   bloodGroup: req.body.bloodGroup,
  //   isApproved: req.body.isApproved,
  //   healthIssue: req.body.healthIssue,
  //   disability: req.body.disability,
  //   isActive: req.body.isActive,
  //   address: req.body.address,
  //   emergencyNumber: req.body.emergencyNumber,
  // };

  let Athlete = await AthleteModel.findOne({ _id: id });

  if (!Athlete) {
    res.json({ data: "", msg: "Athlete not found", rcode: 404 });
  }

  // Update only the fields that are provided in the request body
  if (req.body.bloodGroup !== undefined) {
    Athlete.bloodGroup = req.body.bloodGroup;
  }

  if (req.body.isApproved !== undefined) {
    Athlete.isApproved = req.body.isApproved;
  }

  if (req.body.healthIssue !== undefined) {
    Athlete.healthIssue = req.body.healthIssue;
  }

  if (req.body.disability !== undefined) {
    Athlete.disability = req.body.disability;
  }

  if (req.body.isActive !== undefined) {
    Athlete.isActive = req.body.isActive;
  }

  if (req.body.address !== undefined) {
    Athlete.address = req.body.address;
  }

  if (req.body.emergencyNumber !== undefined) {
    Athlete.emergencyNumber = req.body.emergencyNumber;
  }

  if (req.body.Rating !== undefined) {
    Athlete.Rating = req.body.Rating;
  }

  try {
    let response = await Athlete.save();
    res.json({ data: response, msg: "updated successfully", rcode: 200 });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};
