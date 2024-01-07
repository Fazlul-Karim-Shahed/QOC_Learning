

const { getConfirmedTuition } = require('../Controllers/TeacherControllers/getConfirmedTuition')
const { getTeacher } = require('../Controllers/TeacherControllers/getTeacher')
const { setPremium } = require('../Controllers/TeacherControllers/setPremium')
const { updateTeacherInfo } = require('../Controllers/TeacherControllers/updateTeacherInfo')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/confirmed-tuition/:teacherId', roleCheck('teacher'), getConfirmedTuition)
router.post('/get', getTeacher)
router.put('/set-premium/:teacherId', roleCheck('admin'), setPremium)
router.put('/:teacherId', roleCheck('teacher'), updateTeacherInfo)

module.exports = router