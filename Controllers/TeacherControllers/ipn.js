
const { default: axios } = require("axios")
const { TeacherModel } = require("../../Models/TeacherModel")
const { TransactionModel } = require("../../Models/TransactionModel")
const { default: mongoose } = require("mongoose")


const ipn = async (req, res) => {


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


    let teacher = await TeacherModel.findOne({ _id: new mongoose.Types.ObjectId(transaction.userInfo.userId) })

   


    if (req.query.status === 'success') {

        teacher['batch'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: transaction.paymentID
        }

        teacher.save().then(data => {
            res.redirect(`http://localhost:3000/${req.query.status}`)
        }).catch(err => {
            res.redirect(`http://localhost:3000/${req.query.status}`)
        })


    }
    else {

        res.redirect(`http://localhost:3000/${req.query.status}`)
        
    }


}


module.exports.ipn = ipn