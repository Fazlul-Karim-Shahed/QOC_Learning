
const { default: axios } = require("axios")
const { StudentModel } = require("../../Models/StudentModel")
const { TransactionModel } = require("../../Models/TransactionModel")


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

        transaction.save().then(data => {
            console.log('Transaction saved successfully')
        })

    })

    let student = await StudentModel.findOne({ _id: transaction.userInfo.userId })


    if (req.query.status === 'success') {

        student['assignment'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: req.query.paymentID
        }

        student.save().then(data => {

            res.redirect(`https://qoc.koncept-tech.com/${req.query.status}`)

        }).catch(err => {
            console.log('Ass err: ', err)

        })


    }
    else {

        res.redirect(`https://qoc.koncept-tech.com/${req.query.status}`)
    }


}


module.exports.ipn = ipn