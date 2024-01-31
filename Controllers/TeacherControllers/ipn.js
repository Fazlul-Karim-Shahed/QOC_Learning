
const { TeacherModel } = require("../../Models/TeacherModel")
const { TransactionModel } = require("../../Models/TransactionModel")


const ipn = async (req, res) => {

    let data = req.body

    let teacher = await TeacherModel.findOne({ _id: data.value_a })

    await TransactionModel.create({
        userInfo: {
            userId: teacher._id,
            username: teacher.username,
            mobile: teacher.mobile,
            email: teacher.email,
            role: teacher.role,
        },
        status: data.status,
        transId: data.tran_id,
        tranDate: data.tran_date,
        amount: data.currency_amount,
        title: 'Premium Teacher'
    })


    if (data.status === 'VALID') {



        teacher['batch'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: data.tran_id
        }

        teacher.save().then(data => {
            console.log(data)
            res.send({ message: `Transaction status: ${data.status}. batch premium service activated till ${new Date(data.batch.endTime).toLocaleString()}`, error: false, data: data });
        }).catch(err => {
            console.log(err)
            res.send({ message: 'Something went wrong while activating batch premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {

        res.send({ message: 'Transaction status: ' + data.status, error: true })
        
    }


}


module.exports.ipn = ipn