


const { default: mongoose } = require('mongoose')
const { TransactionModel } = require('../../Models/TransactionModel')

const getTransactionById = async (req, res) => {

    let transactions = await TransactionModel.find({ "userInfo.userId": new mongoose.Types.ObjectId(req.params.id) })

    if (transactions.length != 0) {
        res.status(200).send({ message: 'All transactions', error: false, data: transactions })
    }
    else {
        res.send({ message: 'No transactions found', error: true })
    }


}

module.exports.getTransactionById = getTransactionById
