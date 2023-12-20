const { createCurriculum } = require('../Controllers/CurriculumController/createCurriculum')
const { getAllCurriculum } = require('../Controllers/CurriculumController/getAllCurriculum')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createCurriculum)
router.get('/', getAllCurriculum)


module.exports = router