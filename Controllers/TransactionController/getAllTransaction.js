


const { TransactionModel } = require('../../Models/TransactionModel')

const getAllTransactions = async (req, res) => {

    let transactions = await TransactionModel.find().sort({ tranDate: -1 });

    if (transactions.length != 0) {
        res.status(200).send({ message: 'All transactions', error: false, data: transactions })
    }
    else {
        res.send({ message: 'No transactions found', error: true })
    }


}

module.exports.getAllTransactions = getAllTransactions
