const { getStudentAllTuition } = require('../Controllers/StudentControllers/getStudentAllTuition')
const { getStudentById } = require('../Controllers/StudentControllers/getStudentById')
const { updateStudent } = require('../Controllers/StudentControllers/updateStudent')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/all-tuition/:studentId', roleCheck('student'), getStudentAllTuition)
router.get('/:studentId', getStudentById)
router.put('/:studentId', updateStudent)

module.exports = router