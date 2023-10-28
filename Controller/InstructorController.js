const InstructorModel = require('../Model/instructerModel')

module.exports.addInstructor = async function(req,res){

    let Instructor = new InstructorModel(req.body)

    let data = await Instructor.save();

    console.log(data);

    res.json({data:data , msg: "Instructor Added", rcode: 200})
}

module.exports.getInstructor = async function(req,res){

    InstructorModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Instructor Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });
}


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

    if(req.body.sports !== undefined)
    {
        Instructor.sports = req.body.sports
    }
  
    try {
        let response = await Instructor.save();
        res.json({ data: response, msg: "updated successfully", rcode: 200 });
    } catch (error) {
        console.error(error);
        res.json({ data:error.msg, msg: "smw", rcode: -9 });
    }

   
};

  



