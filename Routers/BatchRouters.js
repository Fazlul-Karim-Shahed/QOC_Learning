
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
const { bkashGrantToken } = require('../Middlewares/bkashGrantToken')
const { getEnrolledBatch } = require('../Controllers/BatchController/getEnrolledBatch')
const { createAnnouncement } = require('../Controllers/BatchController/createAnnouncement')
const { getBatchDashboard } = require('../Controllers/BatchController/getBatchDashboard')
const { deleteBatch } = require('../Controllers/BatchController/deleteBatch')


const router = require('express').Router()

router.post('/', roleCheck('teacher'), premiumCheck('batch'), createBatch)
router.post('/get', getAllBatch)
router.delete('/:batchId', roleCheck('admin'), deleteBatch)
router.get('/enroll/:studentId', getEnrolledBatch)
router.put('/enroll/:batchId', roleCheck('student'), enrollBatch)
router.post('/join/payment', roleCheck('student'), bkashGrantToken(), createJoiningBatchPayment)
router.get('/join/payment/ipn', joiningBatchIpn)

router.post('/announcement/:batchId', createAnnouncement)
router.get('/dashboard/:batchId/teacher', roleCheck('teacher'), premiumCheck('batch'), getBatchDashboard)
router.get('/dashboard/:batchId/student', roleCheck('student'), getBatchDashboard)
router.get('/dashboard/:batchId/admin', roleCheck('admin'), getBatchDashboard)

module.exports = router