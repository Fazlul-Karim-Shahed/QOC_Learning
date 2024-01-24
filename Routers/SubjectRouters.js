
const { addSubjectMaterials } = require('../Controllers/SubjectController/addSubjectMaterials')
const { addSubjectOutlines } = require('../Controllers/SubjectController/addSubjectOutlines')
const { createSubject } = require('../Controllers/SubjectController/createSubject')
const { getASubject } = require('../Controllers/SubjectController/getASubject')
const { getSubjects } = require('../Controllers/SubjectController/getSubjects')
const { removeSubjectMaterials } = require('../Controllers/SubjectController/removeSubjectMaterials')
const { removeSubjectOutlines } = require('../Controllers/SubjectController/removeSubjectOutline')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createSubject)
router.get('/:curriculumId', getSubjects)

router.get('/get-subject/:subjectId', getASubject)

router.put('/add-outline/:subjectId', roleCheck('admin'), addSubjectOutlines)
router.put('/remove-outline/:subjectId/:position', roleCheck('admin'), removeSubjectOutlines)
router.put('/add-material/:subjectId', roleCheck('admin'), addSubjectMaterials)
router.put('/remove-material/:subjectId/:position', roleCheck('admin'), removeSubjectMaterials)


module.exports = router