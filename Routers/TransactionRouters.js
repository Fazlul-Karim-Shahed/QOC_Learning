
const router = require('express').Router()


const { roleCheck } = require('../Middlewares/roleCheck') // dependent to roleCheck
const { getAllTransactions } = require('../Controllers/TransactionController/getTransaction')



router.get('/', roleCheck('admin'), getAllTransactions )



module.exports = router