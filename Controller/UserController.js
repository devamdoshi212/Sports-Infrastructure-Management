const UserModel = require("../Model/UsersModel");
const DistrictModel = require("../Model/DistrictsModel");
const SportComplexModel = require("../Model/SportsComplexModel");
const sendMail = require("../sendEmail");
const InstructorModel = require("../Model/instructorModel");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const athleteModel = require("../Model/athleteModel");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports.signup = async function (req, res) {
  let User = new UserModel(req.body);

  if (User.Role == 4) {
    const password = sendMail.passwordGenerate(8);
    User.Password = password;
    sendMail.sendEmail(User.Email, password);

    let data = await User.save();
    // let did = new mongoose.Types.ObjectId(data.DistrictId);
    let district = await DistrictModel.findOne({ _id: data.DistrictId });
    district.authorityID = new mongoose.Types.ObjectId(data._id);
    let response = await district.save();
    res.json({ data: data, msg: "User Added(role:4)", rcode: 200 });
  } else if (User.Role == 3) {
    const password = sendMail.passwordGenerate(8);
    User.Password = password;
    sendMail.sendEmail(User.Email, password);
    let data = await User.save();

    let SportComplex = await SportComplexModel.findOne({
      _id: req.body.SportComplexId,
    });

    SportComplex.manager = new mongoose.Types.ObjectId(data._id);
    let response = await SportComplex.save();
    res.json({ data: data, msg: "User Added(role:3)", rcode: 200 });
  } else if (User.Role == 2) {
    const password = sendMail.passwordGenerate(8);
    User.Password = password;
    sendMail.sendEmail(User.Email, password);
    let data = await User.save();

    let instructordata = {
      SportComplexId: req.body.SportComplexId,
      userId: data._id,
      createdBy: req.body.createdBy,
      sports: req.body.sports,
    };
    let Instructor = new InstructorModel(instructordata);

    let data2 = await Instructor.save();
    res.json({
      data: { data2, data },
      msg: "User Added(role:2)",
      rcode: 200,
    });
  } else if (User.Role == 1) {
    const password = sendMail.passwordGenerate(8);
    User.Password = password;
    sendMail.sendEmail(User.Email, password);
    let data = await User.save();
    res.json({ data: data, msg: "User Added(role:1)", rcode: 200 });
  } else if (User.Role == 0) {
    await User.save();
    let photoTo = req.body.photo.split("/");
    let myPhotoName = photoTo.pop();
    // let myPhotoName = Date.now() + "." + req.body.photoType;
    let athlete = new athleteModel({
      address: req.body.address,
      bloodGroup: req.body.bloodGroup,
      disability: req.body.disability,
      baseUrl: "./athletes/" + myPhotoName,
      isActive: 1,
      userId: User._id,
      emergencyNumber: req.body.emergencyNumber,
      healthIssue: req.body.healthIssue,
    });
    await athlete.save();
    res.json({ rcode: 200, myPhotoName });
  } else {
    res.json({ data: data, msg: "User Added", rcode: 200 });
  }
};

module.exports.login = async function (req, res) {
  const { Email, Password } = req.body;

  let User = await UserModel.findOne({ Email: Email });

  if (User && User.Password == Password) {
    const accesstoken = jwt.sign(
      { Email: User.Email, Password: User.Password },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      data: User,
      msg: "login done",
      token: accesstoken,
      rcode: 200,
    });
  } else {
    res.json({ data: req.body, msg: "Invalid credential", rcode: -9 });
  }
};

module.exports.getUser = function (req, res) {
  UserModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "User Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.getUserWithDistrict = function (req, res) {
  UserModel.find(req.query)
    .populate("DistrictId")
    .then((data) => {
      res.json({ data: data, msg: "User Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.getUserWithSportsComplex = function (req, res) {
  UserModel.find(req.query)
    .populate("SportComplexId")
    .then((data) => {
      res.json({ data: data, msg: "User Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.getUserWithDistrictandSportsComplex = function (req, res) {
  UserModel.find(req.query)
    .populate("SportComplexId")
    .populate("DistrictId")
    .then((data) => {
      res.json({ data: data, msg: "User Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};

module.exports.uploadPhoto = async (req, res) => {
  res.json({ rcode: 200 });
};

module.exports.athleteDetail = async function (req, res) {
  try {
    const data = await UserModel.findOne(req.query);

    if (data != null) {
      console.log(data._id);
      let athleteDetail = await athleteModel.find({ userId: data._id });
      const responseData = {
        data: data,
        athleteDetail: athleteDetail,
        msg: "User Retrieved",
        rcode: 200,
      };
      console.log(data.Name);
      console.log(responseData);
      res.json(responseData);
    } else {
      res.json({ rcode: -9 });
    }
    // Assuming data is an array or a single object, not a circular structure

    // Extract only the necessary data from data, excluding circular references
  } catch (err) {
    res.json({ data: err.message, msg: "Error occurred", rcode: -9 });
  }
};
