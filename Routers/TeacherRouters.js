
const { getTeacherAllTuition } = require('../Controllers/TeacherControllers/getTeacherAllTuition')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/all-tuition', roleCheck('teacher'), getTeacherAllTuition)
router.put('/set-premium/:teacherId', roleCheck('admin'),)

module.exports = router