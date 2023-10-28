const PaymentModel = require('../Model/PaymentModel')

module.exports.addPayment = async function(req,res){

    let Payment = new PaymentModel(req.body)

    let data = await Payment.save();

    console.log(data);

    res.json({data:data , msg: "Payment Genrated", rcode: 200})
}

module.exports.getAllPayments = async function(req,res){

    PaymentModel.find(req.query)
    .then((data) => {
      res.json({ data: data, msg: "Payment Retrived", rcode: 200 });
    })
    .catch((err) => {
      res.json({ data: err.msg, msg: "smw", rcode: -9 });
    });

}

module.exports.updatePayment = async function(req,res){

    const id = req.params.id
    let Payment = await PaymentModel.findOne({ _id: id });
    
    if (req.body.duration !== undefined) {
        Payment.duration = req.body.duration;
    }

    if (req.body.timeSlot !== undefined) {
        Payment.timeSlot = req.body.timeSlot;
    }

  
    try {
        let response = await Payment.save();
        res.json({ data: response, msg: "payment updated successfully", rcode: 200 });
    } catch (error) {
        console.error(error);
        res.json({ data:error.msg, msg: "smw", rcode: -9 });
    }
} 