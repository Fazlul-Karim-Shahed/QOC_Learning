

const { model, Schema } = require('mongoose')

const TransactionModel = model('Transaction', new Schema({

    title: { type: String, required: true },

    userInfo: {
        userId: String,
        username: String,
        mobile: String,
        email: String,
        role: String,
    },
    id_token: { type: String, required: true },
    paymentID: { type: String, required: true },
    status: { type: String },
    tranDate: { type: String },
    amount: { type: Number },
    payerReference: { type: String }

}, { timestamps: true }))


module.exports.TransactionModel = TransactionModel