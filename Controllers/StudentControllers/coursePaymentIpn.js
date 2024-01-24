
const { StudentModel } = require("../../Models/StudentModel")
const { TransactionModel } = require("../../Models/TransactionModel")


const coursePaymentIpn = async (req, res) => {

    let data = req.body

    let student = await StudentModel.findOne({ _id: data.value_a })

    await TransactionModel.create({
        userInfo: {
            userId: student._id,
            username: student.username,
            mobile: student.mobile,
            email: student.email,
            role: student.role,
        },
        status: data.status,
        transId: data.tran_id,
        tranDate: data.tran_date,
        amount: data.currency_amount,
    })


    if (data.status === 'VALID') {

        student['course'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: data.tran_id
        }

        student.save().then(data => {
            res.send({ message: `Transaction status: ${data.status}. batch premium service activated till ${new Date(data.batch.endTime).toLocaleString()}`, error: false, data: data });
        }).catch(err => {
            res.send({ message: 'Something went wrong while activating batch premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {

        res.send({ message: 'Transaction status: ' + data.status, error: true })

    }


}


module.exports.coursePaymentIpn = coursePaymentIpn