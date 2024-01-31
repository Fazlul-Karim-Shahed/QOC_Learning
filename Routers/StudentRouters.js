const { coursePaymentIpn } = require('../Controllers/StudentControllers/coursePaymentIpn')
const { createCoursePayment } = require('../Controllers/StudentControllers/createCoursePayment')
const { getAllActivity } = require('../Controllers/StudentControllers/getAllActivity')
const { getAllStudent } = require('../Controllers/StudentControllers/getAllStuents')
const { getStudentAllTuition } = require('../Controllers/StudentControllers/getStudentAllTuition')
const { getStudentById } = require('../Controllers/StudentControllers/getStudentById')
const { setAssignmentPremium } = require('../Controllers/StudentControllers/setAssignmentPremium')
const { setCoursePremium } = require('../Controllers/StudentControllers/setCoursePremium')
const { updateStudent } = require('../Controllers/StudentControllers/updateStudent')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.get('/all-tuition/:studentId', roleCheck('student'), getStudentAllTuition)
router.get('/:studentId', getStudentById)
router.get('/', roleCheck('admin'), getAllStudent)
router.put('/:studentId', updateStudent)

router.put('/set-assignment-premium/:studentId', roleCheck('admin'), setAssignmentPremium)
router.put('/set-course-premium/:studentId', roleCheck('admin'), setCoursePremium)

router.post('/course/payment', roleCheck('student'), createCoursePayment)
router.post('/course/payment/ipn', coursePaymentIpn)
router.get('/activity/:studentId', roleCheck('student'), getAllActivity)

module.exports = router