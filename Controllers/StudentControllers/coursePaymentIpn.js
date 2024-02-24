
const { default: axios } = require("axios")
const { StudentModel } = require("../../Models/StudentModel")
const { TransactionModel } = require("../../Models/TransactionModel")


const coursePaymentIpn = async (req, res) => {

    console.log(req.query.status)

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

    let student = await StudentModel.findOne({ _id: transaction.userInfo.userId })



    if (req.query.status === 'success') {

        student['course'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: req.query.paymentID
        }

        student.save().then(data => {
            res.redirect(`http://localhost:3000/${req.query.status}`)

        }).catch(err => {
            res.redirect(`http://localhost:3000/${req.query.status}`)
        })


    }
    else {

        res.redirect(`http://localhost:3000/${req.query.status}`)

    }


}


module.exports.coursePaymentIpn = coursePaymentIpn