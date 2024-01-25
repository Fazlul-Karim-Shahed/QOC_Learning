const { coursePaymentIpn } = require('../Controllers/StudentControllers/coursePaymentIpn')
const { createCoursePayment } = require('../Controllers/StudentControllers/createCoursePayment')
const { getAllStudent } = require('../Controllers/StudentControllers/getAllStuents')
const { getStudentAllTuition } = require('../Controllers/StudentControllers/getStudentAllTuition')
const { getStudentById } = require('../Controllers/StudentControllers/getStudentById')
const { updateStudent } = require('../Controllers/StudentControllers/updateStudent')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.get('/all-tuition/:studentId', roleCheck('student'), getStudentAllTuition)
router.get('/:studentId', getStudentById)
router.get('/', roleCheck('admin'), getAllStudent)
router.put('/:studentId', updateStudent)

router.post('/course/payment', roleCheck('student'), createCoursePayment)
router.post('/course/payment/ipn', coursePaymentIpn)

module.exports = router