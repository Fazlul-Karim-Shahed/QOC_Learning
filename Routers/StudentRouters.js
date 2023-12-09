const { getStudentAllTuition } = require('../Controllers/StudentControllers/getStudentAllTuition')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/all-tuition/:studentId',roleCheck('student'), getStudentAllTuition)

module.exports = router