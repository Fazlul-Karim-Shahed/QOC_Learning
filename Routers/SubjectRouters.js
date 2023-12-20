
const { createSubject } = require('../Controllers/SubjectController/createSubject')
const { getSubjects } = require('../Controllers/SubjectController/getSubjects')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createSubject)
router.get('/:curriculumId', getSubjects)


module.exports = router