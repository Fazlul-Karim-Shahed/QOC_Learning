

const { default: mongoose } = require("mongoose")
const { BatchModel } = require("../../Models/BatchModel")
const { TransactionModel } = require("../../Models/TransactionModel")
const { StudentModel } = require("../../Models/StudentModel")

const joiningBatchIpn = async (req, res) => {

    let data = req.body


    let student = await StudentModel.findOne({ _id: new mongoose.Types.ObjectId(data.value_b) })



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

        }).catch(err => {
            console.log('Er: ', err)
        })


    }
    else {
        console.error('Something went wrong while joining batch payments service. Please contact with QOC management')

    }


}


module.exports.joiningBatchIpn = joiningBatchIpn