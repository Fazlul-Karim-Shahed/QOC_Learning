const { addCurriculum } = require('../Controllers/CurriculumController/addCurriculum')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), addCurriculum)


module.exports = router