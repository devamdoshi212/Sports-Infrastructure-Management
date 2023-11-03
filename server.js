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
const AthleteController = require("./Controller/AthleteController");
const InstructorController = require("./Controller/InstructorController");
const AthleteImageController = require("./Controller/AthleteImageController");
const PaymentController = require("./Controller/PaymentController");
const RatingController = require("./Controller/RatingController");
const ComplaintController = require("./Controller/ComplaintController");
const SessionController = require("./Controller/SessionConroller");
const SupervisorController = require("./Controller/SupervisorController");
const AuthorityController = require("./Controller/AuthorityController");
const {
  filtersportsforcomplex,
} = require("./Controller/FilterSportsForComplex");

const bodyParser = require("body-parser");
const app = express();

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//UserRoutes
app.use("/", UserRoute);
app.post("/verify", decodedToken.decodedToken);
app.get("/getuser", UserController.getUser);
app.get("/getuserwithdistrict", UserController.getUserWithDistrict);
app.get("/getuserwithsportscomplex", UserController.getUserWithSportsComplex);
app.get(
  "/getuserwithdistrictwithcomplex",
  UserController.getUserWithDistrictandSportsComplex
);
app.get("/getuserwithathelte", UserController.athleteDetail);

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
app.get(
  "/getSportsComplexwithmanager",
  SportsComplexController.getSportsComplexwithmanager
);
app.get(
  "/getSportsComplexwithsport",
  SportsComplexController.getSportsComplexwithSportName
);
app.get(
  "/getSportsComplexwithdistrict",
  SportsComplexController.getSportsComplexwithdistrict
);
app.get(
  "/getSportsComplexwithmanagerwithdistrict",
  SportsComplexController.getSportsComplexwithmanagerwithdistrict
);
app.get("/searchSportsComplex", SportsComplexController.SearchComplex);

app.patch(
  "/updateSportsComplex/:id",
  SportController.upload.array("images"),
  SportsComplexController.updateSportsComplex
);
app.get("/getComplexFromSport", SportsComplexController.sportsComplexOfSport);
app.get("/sportsComplexDetail", SportsComplexController.SportsComplexDetail);

//athlete routes
app.post(
  "/addAthlete",
  AthleteImageController.upload.single("picture"),
  AthleteController.addAthlete
);
app.get("/getAthletes", AthleteController.getAthlete);
app.get(
  "/getAthleteswithsupervisor",
  AthleteController.getAthletewithsupervisor
);
app.get("/getAthleteswithpayments", AthleteController.getAthletewithpayments);
app.get(
  "/getAthleteswithpaymentswithsupervisor",
  AthleteController.getAthletewithpaymentswithsupervisor
);
app.patch("/updateAthlete/:id", AthleteController.updateAthlete);

//Instructor routes
app.post("/addInstructor", InstructorController.addInstructor);
app.get("/getInstructors", InstructorController.getInstructor);
app.get(
  "/getInstructorswithuser",
  InstructorController.getInstructorwithUserName
);
app.get(
  "/getInstructorswithsport",
  InstructorController.getInstructorwithSportsName
);
app.get("/getInstructorswithall", InstructorController.getInstructorwithAll);
app.patch("/updateInstructors/:id", InstructorController.updateInstructor);

//payment routes
app.post("/paymentdetail", PaymentController.addPayment);
app.get("/getPaymentDetails", PaymentController.getAllPayments);
app.get(
  "/getPaymentDetailswithsportwithinstructor",
  PaymentController.getAllPaymentswithsportwithinstructor
);
app.patch("/updatePaymentDetails/:id", PaymentController.updatePayment);
app.get(
  "/countOfPayment",
  PaymentController.CountOFAllPaymentswithsportwithinstructor
);

//Rating routes
app.post("/addRating", RatingController.addRating);
app.get("/getAllRatings", RatingController.getAllRatings);

//Complaint routes
const photoStorage = multer.diskStorage({
  destination: "./public/complaints",
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 15000000 },
});
app.post("/complaintPhoto", uploadPhoto.single("photo"), (req, res) => {
  res.json({ rcode: 200 });
});
app.post("/addComplaint", ComplaintController.addComplaint);
app.get("/getAllComplaints", ComplaintController.getAllComplaints);
app.patch("/updateComplaint/:id", ComplaintController.updateComplaint);

//Authority details
app.get("/AuthorityDetails", AuthorityController.getDetails);

//session routes
// app.get("/getSession", SessionController.getSession);
app.post("/addSession/:id", SessionController.addSession);
app.get("/getSession", SessionController.getSession);
app.get("/filtersport/:id", filtersportsforcomplex);

app.get(
  "/getInstructorForPayment",
  SupervisorController.getInstructorForPayment
);
app.get("/paymentHistoryAthlete", PaymentController.getAthletePayments);
app.listen(9999);
console.log("server started at 9999");
