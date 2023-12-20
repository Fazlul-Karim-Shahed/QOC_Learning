

const { getConfirmedTuition } = require('../Controllers/TeacherControllers/getConfirmedTuition')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/confirmed-tuition/:teacherId', roleCheck('teacher'), getConfirmedTuition)

module.exports = router