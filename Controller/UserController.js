const UserModel = require("../Model/UsersModel");
const sendMail = require('../sendEmail')
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports.signup = async function (req, res) {
  let User = new UserModel(req.body);

  console.log(User);

  if(User.Role == 4)
  {

    const password =  sendMail.passwordGenerate(8)
    console.log(password);
    User.Password = password
    console.log(User.Email);
    sendMail.sendEmail(User.Email,password)
  }

  let data = await User.save();

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
