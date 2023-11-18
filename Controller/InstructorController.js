const UsersModel = require("../Model/UsersModel");
const mongoose = require("mongoose");
const InstructorModel = require("../Model/instructorModel");
const paymentModel = require("../Model/PaymentModel");
const complaintModel = require("../Model/ComplaintModel");

module.exports.addInstructor = async function (req, res) {
  let Instructor = new InstructorModel(req.body);

  let data = await Instructor.save();

  console.log(data);

  res.json({ data: data, msg: "Instructor Added", rcode: 200 });
};

module.exports.getInstructor = async function (req, res) {
  InstructorModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Instructor Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getInstructorwithUserName = async function (req, res) {
  InstructorModel.find(req.query)
    .populate("userId")
    .then((data) => {
      res.json({ data: data, msg: "Instructor Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getInstructorwithSportsName = async function (req, res) {
  InstructorModel.find(req.query)
    .populate("sports.sport")
    .then((data) => {
      res.json({ data: data, msg: "Instructor Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
};
module.exports.getInstructorwithAll = async function (req, res) {
  let data = await InstructorModel.find(req.query)
    .populate("sports.sport")
    .populate("userId");
  res.json({ data: data, msg: "Instructor Retrived", rcode: 200 });

  // .then((data) => {
  // })
  // .catch((err) => {
  //   res.json({ data: err, msg: "smw", rcode: -9 });
  // });
};

module.exports.updateInstructor = async function (req, res) {
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

  let Instructor = await InstructorModel.findOne({ _id: id });

  if (req.body.userId !== undefined) {
    Instructor.userId = req.body.userId;
  }

  if (req.body.createdBy !== undefined) {
    Instructor.createdBy = req.body.createdBy;
  }

  if (req.body.sports !== undefined) {
    Instructor.sports = req.body.sports;
  }

  try {
    let response = await Instructor.save();
    res.json({ data: response, msg: "updated successfully", rcode: 200 });
  } catch (error) {
    console.error(error);
    res.json({ data: error.msg, msg: "smw", rcode: -9 });
  }
};

module.exports.CountForInstructer = async function (req, res) {
  try {
    const data = await paymentModel.aggregate([
      {
        $lookup: {
          from: "instructors",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructorInfo.userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $group: {
          _id: {
            instructorId: "$userInfo.Name",
          },
          uniqueAthleteIds: { $addToSet: "$athleteId" },
        },
      },
      {
        $project: {
          // instructorId: "$_id.instructorId",
          userCount: { $size: "$uniqueAthleteIds" },
        },
      },
    ]);

    const complaincount = await complaintModel.find({ level: 1 });

    const result = await paymentModel.aggregate([
      {
        $match: {
          $and: [
            {
              sportsComplexId: new mongoose.Types.ObjectId(
                req.query.sportsComplexId
              ),
            },
            // {
            //   instructorId: new mongoose.Types.ObjectId(req.query.instructorId),
            // },
          ],
        },
      },
      {
        $lookup: {
          from: "instructors",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructorInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "instructorInfo.userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $match: {
          "instructorInfo.userId": new mongoose.Types.ObjectId(
            req.query.instructorId
          ),
        },
      },
      {
        $group: {
          _id: {
            sportsComplexId: "$sportsComplexId",
            instructorId: "$userInfo.Name",
            athleteId: "$athleteId", // Group by athleteId for unique counts
          },
          athleteCount: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: {
            sportsComplexId: "$_id.sportsComplexId",
            instructorId: "$_id.instructorId",
          },

          uniqueAthleteCount: { $sum: 1 }, // Count of athletes
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          //sportsComplexId: '$_id.sportsComplexId',
          instructorName: "$_id.instructorId",
          //instructorName: '$userInfo.Name',
          uniqueAthleteCount: 1,
        },
      },
    ]);

    console.log(result);
    const responseArray = [
      // { data: data },
      { ComplainCount: complaincount.length },
      { result: result },
      { rcode: 200 },
    ];

    res.json(responseArray);

    // res.json({
    //   data: data,
    //   ComplainCount:complaincount.length,
    //   result : result,
    //   rcode: 200,
    // });
  } catch (err) {
    console.log(err);
  }
};

// module.exports.complaintCount = async function (req, res) {
//   try {
//     let data = await complaintModel.find({ level: 1 });
//     res.json({
//       result: data.length,
//       data: data,
//       rcode: 200,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
