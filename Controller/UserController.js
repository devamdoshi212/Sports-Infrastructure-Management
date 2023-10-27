const UserModel = require("../Model/UsersModel");
const DistrictModel = require("../Model/DistrictsModel");
const sendMail = require("../sendEmail");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports.signup = async function (req, res) {
  let User = new UserModel(req.body);

  console.log(User);

  if (User.Role == 4 || User.Role == 3 || User.Role == 2 || User.Role == 1) {
    const password = sendMail.passwordGenerate(8);
    User.Password = password;
    sendMail.sendEmail(User.Email, password);
  }

  let data = await User.save();
  // let did = new mongoose.Types.ObjectId(data.DistrictId);
  let district = await DistrictModel.findOne({ _id: data.DistrictId });
  district.authorityID = new mongoose.Types.ObjectId(data._id);
  let response = await district.save();
  console.log(response);

  res.json({ data: data, msg: "User Added", rcode: 200 });
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
    res.json({ data: User, msg: "login done", token: accesstoken, rcode: 200 });
  } else {
    res.json({ data: req.body, msg: "Invalid credential", rcode: -9 });
  }
};
