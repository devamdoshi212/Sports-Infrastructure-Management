const express = require("express");
const cors = require("cors");
const multer = require("multer");
const ejs = require("ejs");
const cron = require("node-cron");

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
const AdminController = require("./Controller/AdminController");
const ComplaintTypeController = require("./Controller/ComplaintTypeController");
const ComplaintImageController = require("./Controller/ComplainImageController");
const SportComplexeImageController = require("./Controller/SportComplexImageController");
const SupervisorDashboardController = require("./Controller/SupervisorDashboardController");
const UpdatesController = require("./Controller/UpdatesController");
const UpdatesImageController = require("./Controller/UpdatesImageController");
const UtilizationController = require("./Controller/UtilizationController");
const GuestController = require("./Controller/GuestController");
const OnlinePaymentRouter = require("./Routes/OnlinePaymentRoute");

const {
  filtersportsforcomplex,
} = require("./Controller/FilterSportsForComplex");

const bodyParser = require("body-parser");
const athleteRatingModel = require("./Model/athleteRatingModel");
const {
  getAuthorityComplaint,
} = require("./Controller/AuthorityComplaintController");
const { sendPushNotification } = require("./PushNotification");
const Reminder = require("./Model/Reminder");
const { setReminder } = require("./SetReminder");
const app = express();

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.get("/athelteperformance/:athleteid/:sportid", async (req, res) => {
  let athelteid = req.params.athleteid;
  let sportid = req.params.sportid;
  let analysis = await AthleteController.getParameterSum(sportid, athelteid);

  res.render("chart", { analysis });
});
app.get(
  "/comparativeathelteperformance/:athleteid/:opponentathelteid/:sportid",
  async (req, res) => {
    let athelteid = req.params.athleteid;
    let opponentathelteid = req.params.opponentathelteid;
    let sportid = req.params.sportid;
    let analysis = [];
    let atheltedata = await AthleteController.getParameterSum(
      sportid,
      athelteid
    );
    analysis.push({ currentathelte: atheltedata });

    let opponentdata = await AthleteController.getParameterSum(
      sportid,
      opponentathelteid
    );
    analysis.push({ opponentdata: opponentdata });
    res.render("comparativechart", { analysis });
  }
);
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

//updates,news,achievements
app.post(
  "/addUpdates",
  UpdatesImageController.upload.single("image"),
  UpdatesController.addUpdates
);
app.get("/getUpdates", UpdatesController.getUpdates);
app.get("/getUpdatesForAthlete", UpdatesController.getUpdatesForAthlete);
app.patch("/updateUpdates/:id", UpdatesController.updateUpdates);

//District routes
app.post("/addDistrict", DistrictController.addDistrict);
app.get("/getDistrict", DistrictController.getDistrict);

//Sports Complex routes
app.post(
  "/addSportsComplex",
  SportComplexeImageController.upload.single("picture"),
  SportsComplexController.AddSportsComplex
);
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

// Counts for Supervisor Dashboard (App)

app.get(
  "/SupervisorDasboardCount",
  SupervisorDashboardController.SupervisorDasboardCount
);

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
app.get("/getAthleteWithGoals", AthleteController.getAthleteWithGoals);
app.get("/getAthletesWithRating", AthleteController.getAthletewithRating);
app.get(
  "/getAthletesWithAllRating",
  AthleteController.getAthletesWithAllRating
);
app.get(
  "/getAthletesWithAllSportsRating",
  AthleteController.getAthletesWithAllSportsRating
);
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

app.patch("/goalOfAthlete", AthleteController.goalOfAthletes);
app.patch("/updatedAchievedStatus", AthleteController.achieveOfAthletes);

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
app.get("/CountForInstructer", InstructorController.CountForInstructer);

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
app.get("/addRating", RatingController.addRating);
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
app.post(
  "/addComplaint",
  ComplaintImageController.upload.single("picture"),
  ComplaintController.addComplaint
);
app.post("/addComplaintApp", ComplaintController.addComplaintApp);
app.get("/getAllComplaints", ComplaintController.getAllComplaints);
app.patch("/updateComplaint/:id", ComplaintController.updateComplaint);
//
app.patch(
  "/updateComplaintAthleteResponse/:id",
  ComplaintController.updateComplaintAthleteResponse
);
app.get("/getAuthorityComplaint", getAuthorityComplaint);
app.get("/getAllComplaintsAdmin", ComplaintController.getAllComplaintsAdmin);
//Complaint Types
app.post("/addComplaintType", ComplaintTypeController.addComplaintType);
app.get("/getComplaintType", ComplaintTypeController.getComplainttype);
app.get("/getComplaintsAdmin", ComplaintController.getComplaintsAdmin);

//Authority details
app.get("/AuthorityDetails", AuthorityController.getDetails);
app.get("/getSportsCount", AuthorityController.getSportsCount);

//Admin Routes
app.get("/AdminViewDetails", AdminController.AdminViewDetails);
app.get("/sportDetailOfComplex", AdminController.sportDetailOfComplex);
app.get("/atheleteInSportsComplex", AdminController.atheleteInSportsComplex);

//session routes

// app.get("/getSession", SessionController.getSession);
app.post("/addSession/:id", SessionController.addSession);
app.get("/getSession", SessionController.getSession);
app.get("/filtersport/:id", filtersportsforcomplex);
app.patch("/updateSportsInSession", SessionController.updateSportsInSession);
app.get("/attendanceSportWise", SessionController.attendanceSportWise);

app.get(
  "/getInstructorForPayment",
  SupervisorController.getInstructorForPayment
);
app.get("/paymentHistoryAthlete", PaymentController.getAthletePayments);
// app.patch("/updates",SessionController.updates)

// app.get(
//   "/atheleteCountbyInstructer",
//   InstructorController.atheleteCountbyInstructer
// );

// app.get("/complaintCount", InstructorController.complaintCount);

// app.get(
//   "/supervisorDashboard",
//   SupervisorDashboardController.SportsComplexDetail
// );

//utilizationRoutes
app.get("/timeSlotUtilization", UtilizationController.timeSlotUtilization);
app.get(
  "/sportCapacityUtilization",
  UtilizationController.sportCapacityUtilization
);
app.get("/ComplaintsAnalysis", UtilizationController.ComplaintsAnalysis);
app.get("/monthWiseEnroll", UtilizationController.monthWiseEnroll);
app.get(
  "/DistrictWiseSportsComplex",
  UtilizationController.DistrictWiseSportsComplex
);
app.get("/agewiseSportCount", UtilizationController.agewiseSportCount);
app.get("/agegrpCount", UtilizationController.agegrpCount);
app.get("/rating", UtilizationController.ratingWiseTop5);
app.get("/sportRatingWiseTop5", UtilizationController.sportRatingWiseTop5);
app.get("/monthWiseEventCount", UtilizationController.monthWiseEventCount);
app.get(
  "/monthWiseComplainCount",
  UtilizationController.monthWiseComplainCount
);
app.post(
  "/getAtheleteIdFromPayment",
  UtilizationController.getAtheleteIdFromPayment
);

app.post("/remarkRatingByAthlete", async (req, res) => {
  let {
    sportId,
    athleteId,
    sportComplexId,
    remarks,
    parameters,
    instructorId,
  } = req.body;
  let rating = new athleteRatingModel({
    athleteId,
    remarks,
    sport: sportId,
    sportComplex: sportComplexId,
    parameters,
    instructorId,
  });
  await rating.save();

  res.json({ rcode: 200 });
});
// app.get("/ratingForSupervisor", async (req, res) => {
//   let { sportComplexId } = req.query;
//   let ratings = await athleteRatingModel
//     .find({
//       sportComplex: sportComplexId,
//       isEvaluated: 0,
//     })
//     .populate("athleteId")
//     .sort({ rating: -1 });
//   res.json({ rcode: 200, ratings });
// });

app.get("/ratingForInstructor", async (req, res) => {
  let { instructorId } = req.query;
  let ratings = await athleteRatingModel
    .find({
      instructorId: instructorId,
      isEvaluated: 0,
    })
    .populate({
      path: "athleteId",
      populate: {
        path: "userId",
      },
    })
    .populate("sport")
    .sort({ rating: -1 });
  res.json({ rcode: 200, ratings });
});
app.get("/ratingForAll", async (req, res) => {
  let ratings = await athleteRatingModel
    .find()
    .populate({
      path: "athleteId",
      populate: {
        path: "userId",
      },
    })
    .sort({ rating: -1 });
  res.json({ rcode: 200, ratings });
});
app.post("/ratingByInstructor", async (req, res) => {
  let { ratingId, rating } = req.body;
  let ratings = await athleteRatingModel
    .findOne({ _id: ratingId })
    .populate("athleteId");
  ratings.isEvaluated = 1;
  ratings.rating = rating;
  await ratings.save();
  if (ratings.athleteId.userId) {
    setReminder(
      Date.now(),
      "Check your leaderboard",
      "Your Daily Response Noted",
      [ratings.athleteId.userId]
    );
  }
  res.json({ rcode: 200 });
});
app.get("/averageUserRating", async (req, res) => {
  let rating = await averageRating(req.query.userId, req.query.sportId);
  res.json({ rating, rcode: 200 });
});
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

cron.schedule("*/1 * * * *", async function () {
  console.log("run");
  let today = new Date();
  let reminder = await Reminder.find({
    issent: 0,
    date: { $lt: today },
  }).populate({ path: "userIds", select: { notificationtoken: 1 } });
  for (let index = 0; index < reminder.length; index++) {
    const element = reminder[index];
    await sendPushNotification(
      element.userIds.map((ele) => ele.notificationtoken),
      element.title,
      element.message
    );
    element.issent = 1;
    element.save();
  }
});

//Guest route
app.post("/addGuest", GuestController.addUser);
app.get("/getGuest", GuestController.getAllUsers);
app.get("/gettimeslotforguest", GuestController.gettimeslotfrominstructor);
app.get("/getPaymentTimeslotCount", PaymentController.getPaymentTimeslotCount);

app.use("/onlinepayment", OnlinePaymentRouter);
app.listen(9999);
console.log("server started at 9999");
