
const { default: axios } = require('axios')
const formData = require('form-data')
const generateUniqueId = require('generate-unique-id')
const { StudentModel } = require('../../Models/StudentModel')
const { TransactionModel } = require('../../Models/TransactionModel')


const createCoursePayment = async (req, res) => {

    let student = await StudentModel.findOne({ _id: req.body.studentId })

    axios.post(process.env.bkash_createPaymentApi, {
        mode: '0000',
        payerReference: student._id,
        callbackURL: 'https://qoc.api.koncept-tech.com/api/student/course/payment/ipn',
        amount: '2500',
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
                title: 'Course',
                amount: 2500,
                payerReference: student._id

            }).then(tranData => {

                res.send({ message: 'Payment Initiated', error: false, data: data.data })

            }).catch(err => {

    
                res.send({ message: 'Something went wrong while creating transaction model', error: true, data: err });

            })


        }
        else {

            res.send({ message: 'Something went wrong while initiating bkash payment', error: true, data: data.data });
        }

    }).catch(err => {

        res.send({ message: 'Something went wrong while initiating bkash payment', error: true, data: err.message });

    })



}


module.exports.createCoursePayment = createCoursePayment