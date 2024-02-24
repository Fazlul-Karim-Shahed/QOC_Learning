

const { default: mongoose } = require("mongoose")
const { BatchModel } = require("../../Models/BatchModel")
const { TransactionModel } = require("../../Models/TransactionModel")
const { StudentModel } = require("../../Models/StudentModel")
const { default: axios } = require("axios")

const joiningBatchIpn = async (req, res) => {


    let transaction = await TransactionModel.findOne({ paymentID: req.query.paymentID })

    axios.post(process.env.bkash_executePaymentApi, { paymentID: req.query.paymentID }, {
        headers: {
            "Accept": "application/json",
            "Authorization": transaction.id_token,
            'X-App-Key': process.env.bkash_app_key
        }
    }).then(data => {

        transaction['status'] = req.query.status
        transaction['tranDate'] = data.data.agreementExecuteTime

        transaction.save()
        
    })


    let student = await StudentModel.findOne({ _id: new mongoose.Types.ObjectId(transaction.userInfo.userId) })



    if (req.query.status === 'success') {

        BatchModel.updateOne({ _id: transaction.payerReference }, {
            $push: {
                enrolledStudents: {
                    studentId: new mongoose.Types.ObjectId(student._id),
                    createdAt: new Date().toLocaleString(),
                    transaction: transaction.paymentID,
                }
            }
        }).then(data => {

            res.redirect(`http://localhost:3000/${req.query.status}`)

        }).catch(err => {
            res.redirect(`http://localhost:3000/${req.query.status}`)
        })


    }
    else {
        res.redirect(`http://localhost:3000/${req.query.status}`)
    }


}


module.exports.joiningBatchIpn = joiningBatchIpn