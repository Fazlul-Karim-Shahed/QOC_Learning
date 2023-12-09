const { applyJob } = require('../Controllers/TeacherControllers/applyJob')
const { getTeacherAllTuition } = require('../Controllers/TeacherControllers/getTeacherAllTuition')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.get('/all-tuition',roleCheck('teacher'), getTeacherAllTuition)
router.put('/apply/:jobId',roleCheck('teacher'), applyJob)


module.exports = router