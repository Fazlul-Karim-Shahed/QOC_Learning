

const { default: mongoose } = require("mongoose")
const { BatchModel } = require("../../Models/BatchModel")
const { TransactionModel } = require("../../Models/TransactionModel")
const { StudentModel } = require("../../Models/StudentModel")

const joiningBatchIpn = async (req, res) => {

    let data = req.body

    console.log('Joining Batch: ', body.status)

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
    }).then(data => {
        console.log('Transaction: ', data)
    }).catch(err => {
        console.log('Eroro: ', err)
    })


    if (data.status === 'VALID') {

        BatchModel.updateOne({ _id: data.value_a }, {
            $push: {
                enrolledStudents: {
                    studentId: new mongoose.Types.ObjectId(data.value_b),
                    createdAt: new Date().toLocaleString(),
                    transaction: data.tran_id,
                }
            }
        }).then(data => {

            console.log('data: ', data)
            // res.send({ message: `Transaction status: ${data.status}. batch premium service activated till ${new Date(data.batch.endTime).toLocaleString()}`, error: false, data: data });

        }).catch(err => {
            console.log('Er: ', err)
            // res.send({ message: 'Something went wrong while activating batch premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {
        console.error('Something went wrong while joining batch payments service. Please contact with QOC management')
        // res.send({ message: 'Transaction status: ' + data.status, error: true })

    }


}


module.exports.joiningBatchIpn = joiningBatchIpn