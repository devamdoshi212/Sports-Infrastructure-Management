const sessions = require("../Model/SessionModel");
const mongoose = require("mongoose");
module.exports.addSession = async function (req, res) {
  let existingSession = await sessions.findOne(
    {
      sportscomplex: req.params.id,
    },
    null,
    { sort: { createdAt: -1 } }
  );
  console.log(existingSession);

  let check = false;
  if (existingSession) {
    const testcurrentDate = new Date();
    const testexistingSessionDate = new Date(existingSession.createdAt);
    const currentDate = testcurrentDate.toISOString().split("T")[0]; // Extract the date part
    const existingSessionDate = testexistingSessionDate
      .toISOString()
      .split("T")[0]; // Extract the date part

    console.log("1 => " + existingSessionDate);
    console.log("2 => " + currentDate);
    check = existingSessionDate === currentDate ? true : false;
  }
  // console.log(existingSession);
  // console.log(isToday(existingSession.createdAt));

  if (existingSession && check) {
    //if sportComplex's Session Exist
    const currentUser = req.body.userId;

    const currentUserEnroll = existingSession.enrolls.filter(
      (enroll) => enroll.userId == req.body.userId
    );

    console.log(currentUserEnroll);

    if (
      currentUserEnroll.length > 0 &&
      currentUserEnroll[currentUserEnroll.length - 1].exit == null
    ) {
      // Update the exit time for the user's enrollment
      currentUserEnroll[currentUserEnroll.length - 1].exit = new Date();
      let data = await existingSession.save();

      res.json({
        currentErollObjId: currentUserEnroll[currentUserEnroll.length - 1]._id,
        data: data,
        msg: "Exit Done",
        rcode: 205, //Exit code rcode :205
      });
    } else {
      const currentDate = new Date();
      const entryTime = currentDate.getTime();
      const newEnroll = {
        userId: req.body.userId,
        entry: entryTime,
        exit: null,
      };
      existingSession.enrolls.push(newEnroll);

      let data = await existingSession.save();
      res.json({
        data: data,
        rcode: 200, // Entry /Re-Entry rcode : 200
        msg: "Entry / Re-Entry Done",
      });
    }
  } else {
    // sportComplex's Session doesn't exist, send a POST request to create

    const newSession = new sessions();
    newSession.sportscomplex = req.params.id;
    const currentDate = new Date();
    const entryTime = currentDate.getTime();
    const newEnroll = {
      userId: req.body.userId,
      entry: entryTime,
      exit: null,
    };
    newSession.enrolls.push(newEnroll);
    newSession.date = Date.now();
    let data1 = await newSession.save();
    res.json({
      data: data1,
      msg: "New Entry also First Entry of Complex",
      rcode: 200,
    });
  }
};

module.exports.getSession = async function (req, res) {
  try {
    let sportscomplex = req.query.sportscomplex;
    let date = new Date(req.query.date);
    date.setHours(0, 0, 0, 0);
    let night12 = new Date(date.getTime() + 86400000);
    console.log(date + "  " + night12);
    const data = await sessions
      .find({
        sportscomplex: sportscomplex,
        date: { $gte: date, $lt: night12 },
      })
      .populate("sportscomplex")
      .populate("enrolls.userId");
    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.msg,
      rcode: -9,
    });
  }
};

//create patch query to add sports in session enroll array
module.exports.updateSportsInSession = async function (req, res) {
  try {
    let sportscomplex = req.query.sportscomplex;
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    let night12 = new Date(date.getTime() + 86400000);

    let data = await sessions.findOne({
      sportscomplex: sportscomplex,
      date: { $gte: date, $lt: night12 },
    });
    // data.enrolls.

    const enroll_id = req.query._id;
    console.log(enroll_id);
    const indexToUpdate = data.enrolls.findIndex(
      (enroll) => enroll._id == enroll_id
    );

    const sport = req.body.sport;
    console.log(sport);
    console.log(indexToUpdate);

    if (indexToUpdate !== -1) {
      // Update the "sport" field in the specified "enrolls" entry
      data.enrolls[indexToUpdate].sport = sport;
    } else {
      console.log("Enrolls entry not found with the specified _id.");
    }

    await data.save();

    res.json({
      datas: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err.msg,
      rcode: -9,
    });
  }
};


module.exports.attendanceSportWise=async function (req,res){
  try {
  
    let sportscomplex = req.query.sportscomplex;
    let date = new Date(req.query.from);
    // console.log(date)
    date.setHours(0, 0, 0, 0);
    let night12 = new Date(date.getTime() + 86400000);
    // console.log(night12)
    let from=new Date(req.query.from)
    let to=new Date(req.query.to)
    to.setTime(to.getTime()+86400000)
// console.log(to)
// console.log(from)
    let query={
      sportscomplex:  new mongoose.Types.ObjectId(sportscomplex),
    }

    if (req.query.from)
    {
      query.date={ $gte: date, $lt: night12 }
    }
    if(req.query.from && req.query.to)
    {
      query.date={ $gte: from, $lte: to}
    }

    //   let data=await sessions.findOne({sportscomplex:sportscomplex,
    //   date:{ $gte: date, $lt: night12 }
    // })

    let data=await sessions.aggregate([
      {
        $match:query
    },
    {
      $unwind:"$enrolls"
    },
    {
      $unwind:"$enrolls.sport",
    },
    {
      $group:{
        _id:"$enrolls.sport",
      totalCount:{$sum:1}
      }
    },  
    {
      $lookup:{
        from:"sports",
        localField:"_id",
        foreignField:"_id",
        as:"_id"
      }
    },
      {
        $unwind:"$_id"
      },
    {
      $project:{
        sportName:"$_id.SportName",
          totalCount:1,
        _id:0 
      }
    },
    {
      $sort:{sportName:1}
    }
    ])

    res.json({
      datas:data.length,
      data: data,
      rcode: 200,
    });    
  } catch (err) {
    console.log(err)
  res.json({
    error: err.msg,
    rcode: -9,
  });
  }
}

// module.exports.updates=async function(req,res){
//   try {

//   let data=await sessions.find()
// //   data.forEach(ele => {
// //     ele.enrolls.forEach((ele)=>{
// //       ele.sport=["654a743edf5e36e891e63626"]
// //     })
// //   });
    
// // await data.save()
// for (const doc of data) {
//   // Iterate through each enrolls in the document
//   for (const enroll of doc.enrolls) {
//     enroll.sport = ["654a743edf5e36e891e63626"];
//   }

//   // Save the changes to the document
//   await doc.save();
// }

//     res.json({
//       datas:data.length,
//       data: data,
//       rcode: 200,
//     });  
//   } catch (err) {
//     console.log(err)
//   res.json({
//     error: err.msg,
//     rcode: -9,
//   });
//   }
// }