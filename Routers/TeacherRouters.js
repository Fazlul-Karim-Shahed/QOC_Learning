

const { createTeacherPayment } = require('../Controllers/TeacherControllers/createTeacherPayment')
const { ipn } = require('../Controllers/TeacherControllers/ipn')
const { getConfirmedTuition } = require('../Controllers/TeacherControllers/getConfirmedTuition')
const { getTeacher } = require('../Controllers/TeacherControllers/getTeacher')
const { setPremium } = require('../Controllers/TeacherControllers/setPremium')
const { updateTeacherInfo } = require('../Controllers/TeacherControllers/updateTeacherInfo')
const { roleCheck } = require('../Middlewares/roleCheck')
const { bkashGrantToken } = require('../Middlewares/bkashGrantToken')
const { premiumCheck } = require('../Middlewares/premiumCheck')
const { checkTeacherPremium } = require('../Controllers/TeacherControllers/checkTeacherPremium')



const router = require('express').Router()

router.get('/confirmed-tuition/:teacherId', roleCheck('teacher'), getConfirmedTuition)
router.post('/get', getTeacher)
router.put('/set-premium/:teacherId', roleCheck('admin'), setPremium)
router.put('/:teacherId', roleCheck('teacher'), updateTeacherInfo)

router.post('/payment', roleCheck('teacher'), bkashGrantToken(), createTeacherPayment)
router.get('/payment/ipn', ipn)
router.get('/check-premium', roleCheck('teacher'), premiumCheck('batch'), checkTeacherPremium)

module.exports = router