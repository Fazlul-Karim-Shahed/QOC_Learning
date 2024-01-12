
const { checkBatchPremium } = require('../Controllers/TeacherControllers/checkTeacherPremium')
const { createBatch } = require('../Controllers/BatchController/createBatch')
const { createBatchPayment } = require('../Controllers/TeacherControllers/createTeacherPayment')
const { createJoiningBatchPayment } = require('../Controllers/BatchController/createJoiningBatchPayment')
const { enrollBatch } = require('../Controllers/BatchController/enrollBatch')
const { getAllBatch } = require('../Controllers/BatchController/getAllBatch')
const { ipn } = require('../Controllers/TeacherControllers/ipn')
const { joiningBatchIpn } = require('../Controllers/BatchController/joiningBatchIpn')
const { premiumCheck } = require('../Middlewares/premiumCheck')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('teacher'), premiumCheck('batch'), createBatch)
router.post('/get', getAllBatch)
router.put('/enroll/:batchId', roleCheck('student'), enrollBatch)
router.post('/join/payment', roleCheck('student'), createJoiningBatchPayment)
router.post('/join/payment/ipn', joiningBatchIpn)

///



module.exports = router