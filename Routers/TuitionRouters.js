const { approveTuition } = require('../Controllers/TuitionControllers/approveTuition')
const { confirmTuition } = require('../Controllers/TuitionControllers/confirmTuition')
const { createTuition } = require('../Controllers/TuitionControllers/createTuition')
const { deleteTuition } = require('../Controllers/TuitionControllers/deleteTuition')
const { applyTuition } = require('../Controllers/TuitionControllers/applyTuition')
const { roleCheck } = require('../Middlewares/roleCheck')
const { getAllTuition } = require('../Controllers/TuitionControllers/getAllTuition')
const { getApprovedTuition } = require('../Controllers/TuitionControllers/getApprovedTeacher')



const router = require('express').Router()

router.get('/', roleCheck('admin'), getAllTuition)
router.put('/approve/:tuitionId', roleCheck('admin'), approveTuition)
router.put("/confirm/:tuitionId", roleCheck('admin'), confirmTuition)
router.delete('/:tuitionId', roleCheck('admin'), deleteTuition)
router.put('/set-premium/:teacherId', roleCheck('admin'),)

router.post('/create', roleCheck('student'), createTuition)

router.put('/apply/:tuitionId', roleCheck('teacher'), applyTuition)
router.get('/approved', getApprovedTuition)


module.exports = router