

const { model, Schema } = require('mongoose')

const TransactionModel = model('Transaction', new Schema({

    userInfo: {
        userId: String,
        username: String,
        mobile: String,
        email: String,
        role: String,
    },
    status: { type: String, required: true },
    transId: { type: String, required: true },
    tranDate: { type: String, required: true },
    amount: { type: Number, required: true },
    
}, { timestamps: true }))


module.exports.TransactionModel = TransactionModel