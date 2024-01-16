const { addCurriculumOutlines } = require('../Controllers/CurriculumController/addOutline')
const { createCurriculum } = require('../Controllers/CurriculumController/createCurriculum')
const { getACurriculum } = require('../Controllers/CurriculumController/getACurriculum')
const { getAllCurriculum } = require('../Controllers/CurriculumController/getAllCurriculum')
const { removeCurriculumOutlines } = require('../Controllers/CurriculumController/removeOutline')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createCurriculum)
router.get('/', getAllCurriculum)
router.put('/remove-outline/:curriculumId/:position', roleCheck('admin'), removeCurriculumOutlines)
router.put('/add-outline/:curriculumId', roleCheck('admin'), addCurriculumOutlines)
router.get('/:curriculumId', getACurriculum)


module.exports = router