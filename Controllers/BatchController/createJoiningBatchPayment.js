

const { default: axios } = require('axios')
const formData = require('form-data')
const generateUniqueId = require('generate-unique-id')
const { BatchModel } = require('../../Models/BatchModel')
const { StudentModel } = require('../../Models/StudentModel')
const { TransactionModel } = require('../../Models/TransactionModel')
const { default: mongoose } = require('mongoose')


const createJoiningBatchPayment = async (req, res) => {


    let batch = await BatchModel.findOne({ _id: req.body.batchId })
    let student = await StudentModel.findOne({ _id: req.body.studentId })

    // if (batch.enrolledStudents.includes(new mongoose.Types.ObjectId(student._id))) {

    //     res.send({ message: 'You already applied this job', error: true })

// }
    
    if (batch.enrolledStudents.filter(e => e.studentId.toString() === student._id.toString()).length > 0) {
        res.send({ message: 'You already enrolled in this batch', error: true })
    }
    else {
        if (String(batch.fees) === '0') {

            BatchModel.updateOne({ _id: batch._id }, {
                $push: {
                    enrolledStudents: {
                        studentId: student._id,
                        createdAt: new Date().toLocaleString(),
                    }
                }
            }).then(data => {
                res.send({ message: 'Enrolled Successfully', error: false, data: data })
            }).catch(err => {
                res.send({ message: 'Something went wrong while enrolling', error: true, data: err })
            })

        }
        else {
            axios.post(process.env.bkash_createPaymentApi, {
                mode: '0000',
                payerReference: batch._id,
                callbackURL: 'https://api.qoclearning.com/api/batch/join/payment/ipn',
                amount: String(batch.fees),
                currency: 'BDT',
                intent: 'sale'
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": "application/json",
                    "Authorization": req.id_token,
                    'X-App-Key': process.env.bkash_app_key
                }
            }).then(data => {

                if (data.data.statusMessage === "Successful") {

                    TransactionModel.create({

                        userInfo: {
                            userId: student._id,
                            username: student.username,
                            mobile: student.mobile,
                            email: student.email,
                            role: student.role,
                        },
                        paymentID: data.data.paymentID,
                        id_token: req.id_token,
                        title: 'Batch',
                        amount: batch.fees,
                        payerReference: batch._id

                    }).then(tranData => {
                        res.send({ message: 'Payment Initiated', error: false, data: data.data })
                    }).catch(err => {
                        // console.log(err)
                        res.send({ message: 'Something went wrong while creating transaction model', error: true, data: err });
                    })


                }
                else {
                    // console.log(data.data)
                    res.send({ message: `Something went wrong while initiating bkash payment - ${data.data.statusMessage}`, error: true, data: data.data });
                }

            }).catch(err => {

                // console.log(err)
                res.send({ message: 'Something went wrong while initiating bkash payment', error: true, data: err });

            })

        }
    }





}


module.exports.createJoiningBatchPayment = createJoiningBatchPayment