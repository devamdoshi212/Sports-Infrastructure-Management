const AthleteModel = require("../Model/athleteModel");
const athleteRatingModel = require("../Model/athleteRatingModel");
const mongoose = require("mongoose");
const UsersModel = require("./../Model/UsersModel");
const SportModel = require("./../Model/SportModel");
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
  res.json({ data: data, msg: "Athlete Retrived", rcode: 200 });
};
module.exports.getAthleteWithGoals = async function (req, res) {
  let _id = req.query._id;
  let achieved = 0;
  if (achieved !== undefined) {
    achieved = req.query.achieved;
  }
  const data = await AthleteModel.find({ _id });
  let goals = [];
  if (data[0].goals) {
    for (let index = 0; index < data[0].goals.length; index++) {
      const element = data[0].goals[index];
      if (element.achieved === achieved) {
        goals.push(element);
      }
    }
  }
  res.json({ data: goals, msg: "Athlete Goals Retrived", rcode: 200 });
};
module.exports.getAthletewithRating = async function (req, res) {
  const aid = req.query.id;
  const sportId = req.query.sportId;
  let parameter = {};

  const data = await AthleteModel.find().populate("userId");
  let myarray = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    let rating;
    if (sportId) {
      rating = await averageRating(element._id, sportId);
      parameter = await getParameterSum(sportId, aid);
    } else {
      rating = await averageRating(element._id, null);
    }
    myarray.push({
      athleteid: element._id.toString(),
      name: element.userId.Name,
      iconUrl: element.baseUrl,
      score: rating ? rating : 0,
      parameter: parameter,
    });
  }
  let currentuser = myarray.filter((ele) => ele.athleteid == aid);

  myarray.sort((a, b) => b.score - a.score);
  let index = myarray.findIndex((ele) => ele.athleteid == aid);
  currentuser = { ...currentuser, index: index };
  res.json({
    data: data,
    data1: myarray,
    currentuserdata: currentuser,
    msg: "Athlete General Rating Retrived",
    rcode: 200,
  });
};

module.exports.getAthletesWithAllRating = async function (req, res) {
  let sportId = req.query.sportId;

  const data = await AthleteModel.find().populate("userId");
  let myarray = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (sportId) {
      let rating = await averageRating(element._id, sportId);
      let parameter = await getParameterSum(sportId, element._id);
      myarray.push({
        athleteid: element._id.toString(),
        name: element.userId.Name,
        image: element.baseUrl,
        rating: rating ? rating : 0,
        email: element.userId.Email,
        contact: element.userId.ContactNum,
        dob: element.userId.DOB,
        address: element.address,
        parameter: parameter,
      });
    } else {
      let rating = await averageRating(element._id, null);
      myarray.push({
        athleteid: element._id.toString(),
        name: element.userId.Name,
        image: element.baseUrl,
        rating: rating ? rating : 0,
        email: element.userId.Email,
        contact: element.userId.ContactNum,
        dob: element.userId.DOB,
        address: element.address,
        parameter: {},
      });
    }
  }

  myarray.sort((a, b) => b.rating - a.rating);
  res.json({
    data: myarray,
    msg: "Athlete All Rating Retrived",
    rcode: 200,
  });
};

module.exports.getAthletesWithAllSportsRating = async function (req, res) {
  const athelteid = req.query.athleteid;
  const userid = req.query.userid;
  let atheltedata = await AthleteModel.findOne({ _id: athelteid });
  let userdata = await UsersModel.findOne({ _id: userid });
  let sports = await SportModel.find();
  let sportwisedata = [];
  for (let index = 0; index < sports.length; index++) {
    const element = sports[index];

    let rating = await averageRating(athelteid, element._id);
    let parameter = await getParameterSum(element._id, athelteid);
    sportwisedata.push({
      sports: element,
      rating: rating,
      parameter: parameter,
    });
  }
  res.json({
    userdata: userdata || {},
    atheltedata: atheltedata || {},
    data: sportwisedata,
    msg: "Done",
    rcode: 200,
  });
};
async function getParameterSum(sportId, athleteId) {
  try {
    let result = await athleteRatingModel.find({ sport: sportId, athleteId });
    let myobj = {};
    result.forEach((item) => {
      item.parameters.forEach((ele) => {
        if (myobj[ele.parameter]) {
          myobj[ele.parameter] += ele.value;
        } else {
          myobj[ele.parameter] = ele.value;
        }
      });
    });
    // for (const key in myobj) {
    //   console.log(key + " " + myobj[key]);
    // }
    return myobj;
  } catch (e) {
    console.log(e);
  }
}

module.exports.getParameterSum = async function (sportId, athleteId) {
  try {
    let result = await athleteRatingModel.find({ sport: sportId, athleteId });
    let myobj = {};
    result.forEach((item) => {
      item.parameters.forEach((ele) => {
        if (myobj[ele.parameter]) {
          myobj[ele.parameter] += ele.value;
        } else {
          myobj[ele.parameter] = ele.value;
        }
      });
    });
    // for (const key in myobj) {
    //   console.log(key + " " + myobj[key]);
    // }
    return myobj;
  } catch (e) {
    console.log(e);
  }
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
  return total2;
  // return total2 / total;
}

module.exports.averageRating = async function (userId, sportId) {
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
  return total2;
  // return total2 / total;
};
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
  if (req.body.weight !== undefined) {
    Athlete.weight = req.body.weight;
  }
  if (req.body.height !== undefined) {
    Athlete.height = req.body.height;
  }

  try {
    let response = [];
    partialresponse = await Athlete.save();
    response.push(partialresponse);
    res.json({ data: response, msg: "updated successfully", rcode: 200 });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.goalOfAthletes = async function (req, res) {
  let Athlete = await AthleteModel.findOne({ _id: req.query.id });

  if (!Athlete) {
    res.json({ data: "", msg: "Athlete not found", rcode: 404 });
  } else {
    let goal = {
      title: req.body.title,
      description: req.body.description,
      startdate: req.body.startdate || Date.now(),
      targetdate: req.body.targetdate, //useful for reminder
      // actualdate: req.body.actualdate,
      achieved: req.body.achieved || "0",
    };

    Athlete.goals = Athlete.goals || [];
    Athlete.goals.push(goal);

    await AthleteModel.updateOne(
      { _id: req.query.id },
      { $set: { goals: Athlete.goals } }
    );

    res.json({
      data: Athlete,
      msg: "Goals added to Athlete successfully",
      rcode: 200,
    });
  }
};

module.exports.achieveOfAthletes = async function (req, res) {
  try {
    const athlete = await AthleteModel.findOne({ _id: req.query.id });

    if (!athlete) {
      return res
        .status(404)
        .json({ data: "", msg: "Athlete not found", rcode: 404 });
    }

    const goalIdToUpdate = req.query.goalId;
    const updatedAchievedStatus = req.body.updatedAchievedStatus;

    //match the id which we pass and actual id
    const goalToUpdate = athlete.goals.find(
      (goal) => goal._id == goalIdToUpdate
    );

    if (!goalToUpdate) {
      return res
        .status(400)
        .json({ data: "", msg: "Goal not found", rcode: 400 });
    }

    goalToUpdate.achieved = updatedAchievedStatus;
    goalToUpdate.actualdate = Date.now();

    await athlete.save(); // Save the updated document

    return res.status(200).json({
      data: athlete,
      msg: "Achieved status updated successfully",
      rcode: 200,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ data: "", msg: "Internal Server Error", rcode: 500 });
  }
};
