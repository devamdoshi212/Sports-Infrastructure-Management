const sessionModel = require("../Model/SessionModel");
const mongoose = require("mongoose");
const paymentModel = require("../Model/PaymentModel");
const SportsComplex = require("../Model/SportsComplexModel");
const ComplaintModel = require("./../Model/ComplaintModel");
const ComplaintTypeModel = require("./../Model/ComplaintTypeModel");
const DistrictsModel = require("./../Model/DistrictsModel");
const RatingModel = require("../Model/RatingModel");
const UpdatesModel=require("../Model/UpdatesModel")

function countEntriesInTimeSlot(result, startHour, endHour) {
  let count = 0;

  result.forEach((ele) => {
    const entryTime = ele.enrolls.entry;
    // const timezoneOffset = entryTime.getTimezoneOffset();

    const startTime = new Date(
      entryTime.getFullYear(),
      entryTime.getMonth(),
      entryTime.getDate(),
      startHour,
      0,
      0,
      0
    );
    // Adjust for timezone offset
    // startTime.setMinutes(startTime.getMinutes() - timezoneOffset);

    const endTime = new Date(
      entryTime.getFullYear(),
      entryTime.getMonth(),
      entryTime.getDate(),
      endHour,
      0,
      0,
      0
    );
    // Adjust for timezone offset
    // endTime.setMinutes(endTime.getMinutes() - timezoneOffset);

    if (entryTime >= startTime && entryTime < endTime) {
      count++;
    }
  });

  return count;
}

module.exports.timeSlotUtilization = async function (req, res) {
  try {
    let data;
    if (req.query.sportsComplexId) {
      data = await sessionModel.aggregate([
        {
          $match: {
            sportscomplex: new mongoose.Types.ObjectId(
              req.query.sportsComplexId
            ),
          },
        },
        {
          $unwind: "$enrolls",
        },
      ]);
    } else {
      data = await sessionModel.aggregate([
        {
          $unwind: "$enrolls",
        },
      ]);
    }
    let slotCounts = [];

    slotCounts.push(countEntriesInTimeSlot(data, 7, 8));
    slotCounts.push(countEntriesInTimeSlot(data, 8, 9));
    slotCounts.push(countEntriesInTimeSlot(data, 9, 10));
    slotCounts.push(countEntriesInTimeSlot(data, 10, 11));
    slotCounts.push(countEntriesInTimeSlot(data, 11, 12));
    slotCounts.push(countEntriesInTimeSlot(data, 12, 13));
    slotCounts.push(countEntriesInTimeSlot(data, 13, 14));
    slotCounts.push(countEntriesInTimeSlot(data, 14, 15));
    slotCounts.push(countEntriesInTimeSlot(data, 15, 16));
    slotCounts.push(countEntriesInTimeSlot(data, 16, 17));
    slotCounts.push(countEntriesInTimeSlot(data, 17, 18));
    slotCounts.push(countEntriesInTimeSlot(data, 18, 19));


    res.json({
      total: data.length,
      slotcount: slotCounts,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.sportCapacityUtilization = async function (req, res) {
  try {
    let query = {};

    // Check if req.query.sportsComplexId exists
    if (req.query.sportsComplexId != "") {
      query._id = new mongoose.Types.ObjectId(req.query.sportsComplexId);
    }

    const sportComplex = await SportsComplex.findOne(query).populate(
      "sports.sport"
    );

    const mappedSports = sportComplex.sports.map((sportItem) => {
      const { sport, images, rating, fees, capacity } = sportItem;
      // You can perform additional mapping or processing here if needed
      return {
        sport: sport.SportName,
        capacity: capacity,
      };
    });

    mappedSports.sort((a, b) => {
      const sportA = a.sport.toUpperCase();
      const sportB = b.sport.toUpperCase();
      return sportA.localeCompare(sportB);
    });

    const counts = await paymentModel.aggregate([
      {
        $match: {
          sportsComplexId: new mongoose.Types.ObjectId(
            req.query.sportsComplexId
          ),
        },
      },
      {
        $group: {
          _id: "$sports",
          totalAthelete: { $sum: 1 }, // You can use other aggregation operators based on your requirements
        },
      },
      {
        $lookup: {
          from: "sports", // Replace with the actual name of your sports collection
          localField: "_id",
          foreignField: "_id",
          as: "sportDetails",
        },
      },
      {
        $unwind: "$sportDetails",
      },
      {
        $project: {
          sport: "$sportDetails.SportName",
          totalAthelete: 1,
        },
      },
    ]);

    counts.sort((a, b) => {
      const sportA = a.sport.toUpperCase(); // Convert to uppercase for case-insensitive sorting
      const sportB = b.sport.toUpperCase();
      return sportA.localeCompare(sportB);
    });

    let data = [];
    for (let i = 0; i < counts.length; i++) {
      //   const element = [i];
      data.push({
        capacity: mappedSports[i].capacity,
        sport: counts[i].sport,
        totalAthelete: counts[i].totalAthelete,
      });
    }

    res.json({
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      data: err,
      rcode: -9,
    });
  }
};

module.exports.ComplaintsAnalysis = async function (req, res) {
  let complainttype = await ComplaintTypeModel.find();
  let data = [];
  if (req.query.sportsComplexId) {
    for (let index = 0; index < complainttype.length; index++) {
      let solved = 0;
      let solvedsatisfied = 0;
      let solvednotsatisfied = 0;
      let unsolved = 0;

      const element = complainttype[index];
      let temp = await ComplaintModel.find({
        sportsComplex: req.query.sportsComplexId,
        type: element._id,
      });
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (element.status === 1) {
          solved++;
        }
        if (element.status === 0) {
          unsolved++;
        }
        if (element.status === 1 && element.satisfied === 1) {
          solvedsatisfied++;
        }
        if (element.status === 1 && element.satisfied === 0) {
          solvednotsatisfied++;
        }
      }

      data.push({
        type: element.Type,
        solved: solved,
        unsolved: unsolved,
        solvedsatisfied: solvedsatisfied,
        solvednotsatisfied: solvednotsatisfied,
      });
    }
    res.json({ data: data, rcode: 200 });
  } else {
    for (let index = 0; index < complainttype.length; index++) {
      let solved = 0;
      let solvedsatisfied = 0;
      let solvednotsatisfied = 0;
      let unsolved = 0;

      const element = complainttype[index];
      let temp = await ComplaintModel.find({
        type: element._id,
      });
      for (let index = 0; index < temp.length; index++) {
        const element = temp[index];
        if (element.status === 1) {
          solved++;
        }
        if (element.status === 0) {
          unsolved++;
        }
        if (element.status === 1 && element.satisfied === 1) {
          solvedsatisfied++;
        }
        if (element.status === 1 && element.satisfied === 0) {
          solvednotsatisfied++;
        }
      }

      data.push({
        type: element.Type,
        solved: solved,
        unsolved: unsolved,
        solvedsatisfied: solvedsatisfied,
        solvednotsatisfied: solvednotsatisfied,
      });
    }
    res.json({ data: data, rcode: 200 });
  }
};

module.exports.monthWiseEnroll = async function (req, res) {
  try {
    const result = await paymentModel.aggregate([
      // Other stages can be added before the $match stage if needed

      // Conditionally include the $match stage
      ...(req.query.sportsComplexId
        ? [
            {
              $match: {
                sportsComplexId: new mongoose.Types.ObjectId(
                  req.query.sportsComplexId
                ),
              },
            },
          ]
        : []),
        ...(req.query.sports
          ? [
              {
                $match: {
                  sports: new mongoose.Types.ObjectId(
                    req.query.sports
                  ),
                },
              },
            ]
          : []),
      {
        $group: {
          _id: {
            // sports: "$sports",
            month: { $month: "$from" },
            year: { $year: "$from" },
          },
          totalAthelete: { $sum: 1 }, // You can     use other aggregation operators based on your requirements
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // console.log(result);
    res.json({
      datas:result.length,
      data: result,
      rcode: 200,
    });
  } catch (err) {
    console.error(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};

module.exports.DistrictWiseSportsComplex = async function (req, res) {
  // let District = await DistrictsModel.find();
  // let data = [];
  // for (let index = 0; index < District.length; index++) {
  //   const element = District[index];
  //   let SportsComplexes = await SportsComplex.find({ district: element._id });
  //   data.push({
  //     district: element.District,
  //     sportComplex: SportsComplexes.length,
  //   });
  // }
  const data = await SportsComplex.aggregate([
    {
      $group: {
        _id: "$district",
        sportComplex: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "districts", // replace with the actual name of your districts collection
        localField: "_id",
        foreignField: "_id",
        as: "district",
      },
    },
    {
      $unwind: "$district",
    },
    {
      $sort: { "district.District": 1 }, // Sort by the count in descending order
    },
    {
      $project: {
        district: "$district.District", // replace with the actual field in your districts collection
        sportComplex: 1,
      },
    },
    
  ]);


  res.json({ data: data, rcode: 200 });
};

function calculateAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob); // Convert the DOB string to a Date object

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function countSports(data) {
  // Create an object to store the count for each SportName
  const sportCount = {};

  // Iterate through the data array
  data.forEach((item) => {
    const sportName = item.sports.SportName;

    // Check if the SportName is already in the count object
    if (sportCount[sportName]) {
      // If yes, increment the count
      sportCount[sportName]++;
    } else {
      // If not, initialize the count to 1
      sportCount[sportName] = 1;
    }
  });

  return sportCount;
}

function countSports(data) {
  // Create an object to store the count for each SportName
  const sportCount = {};

  // Iterate through the data array
  data.forEach((item) => {
    const sportName = item.sports.SportName;

    // Check if the SportName is already in the count object
    if (sportCount[sportName]) {
      // If yes, increment the count
      sportCount[sportName]++;
    } else {
      // If not, initialize the count to 1
      sportCount[sportName] = 1;
    }
  });

  return sportCount;
}

module.exports.agewiseSportCount = async function (req, res) {
  try {
    let query = {};

    // Check if req.query.sportsComplexId exists
    if (req.query.sportsComplexId) {
      query.sportsComplexId = new mongoose.Types.ObjectId(
        req.query.sportsComplexId
      );
    }

    let data = await paymentModel
      .find(query)
      .populate({
        path: "athleteId",
        populate: {
          path: "userId",
          model: "users", // Replace with the actual model name for users
        },
      })
      .populate("sports");
    // console.log(data[0].athleteId.userId.DOB);
    let maxage = req.query.maxage;
    let minage = req.query.minage;

    data = data.filter((ele) => {
      return (
        calculateAge(ele.athleteId.userId.DOB) < maxage &&
        calculateAge(ele.athleteId.userId.DOB) >= minage
      );
    });

    let count = countSports(data);

    const ct = Object.keys(count);
    const value = Object.values(count);
    res.json({
      result: data.length,
      //   data: data,
      name: ct,
      value: value,
      count: count,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};

module.exports.agegrpCount = async function (req, res) {
  try {
    let query = {};
    if (req.query.sportsComplexId) {
      query.sportsComplexId = new mongoose.Types.ObjectId(
        req.query.sportsComplexId
      );
    }
    if (req.query.sports) {
      query.sports = new mongoose.Types.ObjectId(req.query.sports);
    }
    let data = await paymentModel.find(query).populate({
      path: "athleteId",
      populate: {
        path: "userId",
        model: "users", // Replace with the actual model name for users
      },
    });

    data = data.map((ele) => {
      let dob = ele.athleteId.userId.DOB;
      const age = calculateAge(dob);
      return { ...ele.toObject(), age: age };
    });
    // return { ...ele.toObject(), age };

    if (req.query.year) {
      data = data.filter((ele) => {
        // console.log(ele.from.getFullYear())
        // console.log(req.query.year)
        return ele.from.getFullYear() == req.query.year;
      });
    }
    /*
lessthan 10
10-20
20-25
25-30
30-40
40-50
more then 50
*/
    // let agegrp=Array(7).fill(0)
    let agegrp = {
      "0-10": 0,
      "10-20": 0,
      "20-25": 0,
      "25-30": 0,
      "30-40": 0,
      "40-50": 0,
      "More than 50": 0,
    };
    // console.log(agegrp)
    data.forEach((ele) => {
      if (ele.age < 10) {
        agegrp["0-10"]++;
      } else if (ele.age >= 10 && ele.age < 20) {
        agegrp["10-20"]++;
      } else if (ele.age >= 10 && ele.age < 20) {
        agegrp["20-25"]++;
      } else if (ele.age >= 20 && ele.age < 25) {
        agegrp["25-30"]++;
      } else if (ele.age >= 25 && ele.age < 30) {
        agegrp["30-40"]++;
      } else if (ele.age >= 30 && ele.age < 40) {
        agegrp["40-50"]++;
      } else {
        agegrp["More than 50"]++;
      }
    });

    const name = Object.keys(agegrp);
    const value = Object.values(agegrp);
    res.json({
      results: data.length,
      // data:data,
      name: name,
      value: value,
      count: agegrp,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};

module.exports.ratingWiseTop5 = async function (req, res) {
  try {
    let query = {};
    let data = await SportsComplex.find(query);

    // .populate("sports.sport")
    if (req.query.district) {
      data = data.filter((ele) => {
        return req.query.district == ele.district;
      });
    }
    data = data.map((ele) => {
      const sportsCount = ele.sports.length;
      const totalRating = ele.sports.reduce(
        (sum, sport) => sum + (sport.rating || 0),
        0
      );
      const averageRating = sportsCount > 0 ? totalRating / sportsCount : null;
      // console.log( averageRating)
      return { ...ele.toObject(), averageRating: averageRating };
    });

    data = data
      .sort((a, b) => {
        // Ensure that null values (where averageRating is not calculated) come last
        if (a.averageRating === null) return 1;
        if (b.averageRating === null) return -1;
        // Sort in descending order
        return b.averageRating - a.averageRating;
      })
      .slice(0, 5);

    res.json({
      results: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err);
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
};


module.exports.sportRatingWiseTop5=async function(req,res){
  try {

    let data=await SportsComplex.aggregate([
      {
        $unwind:"$sports"
      },
      // {
      //   $lookup: {
      //     from: "sports", // replace with the actual name of your districts collection
      //     localField: "sports.sport",
      //     foreignField: "_id",
      //     as: "sports.sport",
      //   },
      // },
      // {
      //   $unwind:"$sports.sport"
      // }
    ])

    data=data.filter((ele)=>{
      return req.query.sportId==ele.sports.sport
    })

    if (req.query.district) {
      data = data.filter((ele) => {
        return req.query.district == ele.district;
      });
    }
    
    data= data.sort((a, b) => b.sports.rating - a.sports.rating).slice(0,5);



    res.json({
      results: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err)
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
}


module.exports.monthWiseEventCount=async function(req,res){
try {

  
  const data=await UpdatesModel.aggregate([
    ...(req.query.sportComplexId
      ? [
          {
            $match: {
              sportComplexId: new mongoose.Types.ObjectId(
                req.query.sportComplexId
              ),
            },
          },
        ]
      : []),
  {
    $group: {
      _id: {
        month: { $month: "$createdAt" },
        year: { $year: "$createdAt" },
      },
      totalAthelete: { $sum: 1 }, // You can     use other aggregation operators based on your requirements
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
    },
  },
  ])

  res.json({
    results: data.length,
    data: data,
    rcode: 200,
  });
} catch (err) {
  console.log(err)
  res.json({
    err: err.msg,
    rcode: -9,
  });
}
}


module.exports.monthWiseComplainCount=async function(req,res){
  try {
      let data=await ComplaintModel.aggregate([
        ...(req.query.sportsComplex
          ? [
              {
                $match: {
                  sportsComplex: new mongoose.Types.ObjectId(
                    req.query.sportsComplex
                  ),
                },
              },
            ]
          : []),
          {
            $group: {
              _id: {
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
              },
              totalComplaint: { $sum: 1 }, // You can     use other aggregation operators based on your requirements
            },
          },
          {
            $sort: {
              "_id.year": 1,
              "_id.month": 1,
            },
          },
      ])
      
     
    res.json({
      results: data.length,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err)
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
}


module.exports.getAtheleteIdFromPayment=async function (req,res){
  try {

      let data=await paymentModel.find({
        sports:req.query.sports,
        instructorId:req.query.instructorId,
        "timeSlot.from":req.body.from,
        "timeSlot.to":req.body.to
      })

    let atheleteId=[]
    data.map(data=>atheleteId.push(data.athleteId))

    res.json({
      results: data.length,
      atheleteId:atheleteId,
      data: data,
      rcode: 200,
    });
  } catch (err) {
    console.log(err)
    res.json({
      err: err.msg,
      rcode: -9,
    });
  }
}