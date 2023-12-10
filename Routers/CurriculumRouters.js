const { createCurriculum } = require('../Controllers/CurriculumController/createCurriculum')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createCurriculum)


module.exports = router