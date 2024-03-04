


const { TransactionModel } = require('../../Models/TransactionModel')

const deleteTransactions = async (req, res) => {

    TransactionModel.deleteMany({}).then(data => {
        res.status(200).send({ message: 'All transactions deleted', error: false, data: data })
    })
        .catch(err => {
            res.send({ message: err.message, error: true })
        })



}

module.exports.deleteTransactions = deleteTransactions
