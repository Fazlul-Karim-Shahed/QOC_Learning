
const { checkBatchPremium } = require('../Controllers/BatchController/checkBatchPremium')
const { createBatch } = require('../Controllers/BatchController/createBatch')
const { createBatchPayment } = require('../Controllers/BatchController/createBatchPayment')
const { enrollBatch } = require('../Controllers/BatchController/enrollBatch')
const { getAllBatch } = require('../Controllers/BatchController/getAllBatch')
const { ipn } = require('../Controllers/BatchController/ipn')
const { premiumCheck } = require('../Middlewares/premiumCheck')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('teacher'), premiumCheck('batch'), createBatch)
router.post('/get', getAllBatch)
router.put('/enroll/:batchId', roleCheck('student'), enrollBatch)
router.post('/payment', createBatchPayment)
router.post('/payment/ipn', ipn)
router.get('/check-premium', roleCheck('teacher'), premiumCheck('batch'), checkBatchPremium)


module.exports = router