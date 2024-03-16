

const { createMcq } = require('../Controllers/McqControllers/createMcq')

const { getMcq } = require('../Controllers/McqControllers/getMcq')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('teacher'), createMcq)
router.post('/get', roleCheck('teacher'), getMcq)


module.exports = router