



const { createExam } = require('../Controllers/ExamController/createExam')
const { getAExam } = require('../Controllers/ExamController/getAExam')
const { getAExamMarks } = require('../Controllers/ExamController/getAExamMarks')
const { getAllExam } = require('../Controllers/ExamController/getAllExam')
const { getExamById } = require('../Controllers/ExamController/getExamById')
const { submitExam } = require('../Controllers/ExamController/submitExam')
const { updateMarks } = require('../Controllers/ExamController/updateMarks')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createExam)
router.post('/get', getAllExam)
router.get('/:examId', roleCheck('admin'), getAExam)
router.get('/student/:studentId', roleCheck('student'), getExamById)
router.put('/submit/:examId', roleCheck('student'), submitExam)
router.get('/:examId/:studentId', roleCheck('student'), getAExamMarks)
router.put('/:examId/:studentId', roleCheck('admin'), updateMarks)


module.exports = router