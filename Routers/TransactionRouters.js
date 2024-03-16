
const router = require('express').Router()


const { roleCheck } = require('../Middlewares/roleCheck') // dependent to roleCheck
const { getAllTransactions } = require('../Controllers/TransactionController/getAllTransaction')
const { getTransactionById } = require('../Controllers/TransactionController/getTransactionById')
const { deleteTransactions } = require('../Controllers/TransactionController/deleteTransaction')



router.get('/', roleCheck('admin'), getAllTransactions)
router.get('/:id', getTransactionById)
router.delete('/', roleCheck('admin'), deleteTransactions)



module.exports = router