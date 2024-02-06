
const { default: axios } = require('axios')
const formData = require('form-data')
const generateUniqueId = require('generate-unique-id')
const { TeacherModel } = require('../../Models/TeacherModel')
const { TransactionModel } = require('../../Models/TransactionModel')


const createTeacherPayment = async (req, res) => {

    let teacher = await TeacherModel.findOne({ _id: req.body.teacherId })

    axios.post(process.env.bkash_createPaymentApi, {
        mode: '0000',
        payerReference: teacher._id,
        callbackURL: 'https://qoc.api.koncept-tech.com/api/teacher/payment/ipn',
        amount: '5000',
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
                    userId: teacher._id,
                    username: teacher.username,
                    mobile: teacher.mobile,
                    email: teacher.email,
                    role: teacher.role,
                },
                paymentID: data.data.paymentID,
                id_token: req.id_token,
                title: 'Premium Teacher',
                amount: 5000,
                payerReference: teacher._id

            }).then(tranData => {
                res.send({ message: 'Payment Initiated', error: false, data: data.data })
            }).catch(err => {
                res.send({ message: 'Something went wrong while creating transaction model', error: true, data: err.message });
            })


        }
        else {
            res.send({ message: 'Something went wrong while initiating bkash payment', error: true, data: data.data });
        }

    }).catch(err => {

        res.send({ message: 'Something went wrong while initiating bkash payment', error: true, data: err.message });

    })
}


module.exports.createTeacherPayment = createTeacherPayment