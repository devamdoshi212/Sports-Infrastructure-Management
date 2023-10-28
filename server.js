const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("./config/dbconfig").getDbConnetion();
const UserRoute = require("./Routes/UserRoutes");
const SportController = require("./Controller/SportController");
const decodedToken = require("./Controller/DecodeToken");
const SportDataController = require("./Controller/SportDataController");
const DistrictController = require("./Controller/DistrictController");
const SportsComplexController = require("./Controller/SportsComplexController");
const UserController = require("./Controller/UserController");
const AthleteController = require("./Controller/AthleteController")
const InstructorContrller = require("./Controller/InstructorController")
const AthleteImageController = require("./Controller/AthleteImageController")
const PaymentController = require("./Controller/PaymentController")

const app = express();

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//UserRoutes
app.use("/", UserRoute);
app.post("/verify", decodedToken.decodedToken);
app.get("/getuser", UserController.getUser);
app.get("/getuserwithdistrict", UserController.getUserWithDistrict);
app.get("/getuserwithsportscomplex", UserController.getUserWithSportsComplex);
app.get(
  "/getuserwithsportswithcomplex",
  UserController.getUserWithDistrictandSportsComplex
);

//Sport routes
app.post(
  "/sport",
  SportController.upload.single("picture"),
  SportDataController.AddSport
);
app.get("/getSports", SportDataController.getSport);

//District routes
app.post("/addDistrict", DistrictController.addDistrict);
app.get("/getDistrict", DistrictController.getDistrict);

//Sports Complex routes
app.post("/addSportsComplex", SportsComplexController.AddSportsComplex);
app.get("/getSportsComplex", SportsComplexController.getSportsComplex);
app.patch(
  "/updateSportsComplex/:id",
  SportController.upload.array("images"),
  SportsComplexController.updateSportsComplex
);

//athlete routes
app.post(
  "/addAthlete",
  AthleteImageController.upload.single("picture"),
  AthleteController.addAthlete
);
app.get("/getAthletes", AthleteController.getAthlete);
app.patch("/updateAthlete/:id", AthleteController.updateAthlete);

//Instructor routes
app.post("/addInstructor", InstructorContrller.addInstructor);
app.get("/getInstructors", InstructorContrller.getInstructor);
app.patch("/updateInstructors/:id", InstructorContrller.updateInstructor);


//payment routes
app.post('/paymentdetail',PaymentController.addPayment)
app.get('/getPaymentDetails',PaymentController.getAllPayments)
app.patch('/updatePaymentDetails/:id',PaymentController.updatePayment)
app.listen(9999);
console.log("server started at 9999");
