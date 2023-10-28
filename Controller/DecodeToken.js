
const jwt = require("jsonwebtoken");
const UserModel = require("../Model/UsersModel");

const { ACCESS_TOKEN_SECRET } = process.env;

module.exports.decodedToken = async function (req, res) {
    const { token } = req.body;


    try {
        const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

        let User = await UserModel.findOne({ Email: decodedToken.Email });

        if (User && User.Password == decodedToken.Password)
            res.json({ data: User, msg: "Verified", rcode: 200 });
        else {
            res.json({ data: "", msg: " Not Verified", rcode: -9 });
        }
        // res.json({ decodedToken });
    } catch (error) {
        res.json({ data: error.msg, msg: "Error", rcode: 400 });
    }
};
