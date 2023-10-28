const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

module.exports = function (req, res, next) {
    console.log("In the AuthMidd");
    token = req.headers.token;
    console.log("token=>" + token);

    jwt.verify(req.headers.token, ACCESS_TOKEN_SECRET, function (err, decode) {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                console.log(err);
                res.json({
                    msg: "Please Login before acccess the service ",
                    rcode: -9,
                    data: "",
                });
            }

            if (err.name === "TokenExpiredError") {
                jwt.verify(
                    req.headers.refreshtoken,
                    ACCESS_TOKEN_SECRET,
                    function (err, decoded, next) {
                        if (err) {
                            console.log(err);
                            res.json({
                                msg: "Please Login before acccess the service 2",
                                rcode: -9,
                                data: "",
                            });
                        } else {
                            console.log("decoded from referesh => ", decoded);
                            next();
                        }
                    }
                );
            }
        } else {
            console.log("decoded => ", decode);
            next();
        }
    });
};
