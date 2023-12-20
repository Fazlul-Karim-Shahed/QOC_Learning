

const { createMcq } = require('../Controllers/McqControllers/createMcq')
const { getAllMcq } = require('../Controllers/McqControllers/getAllMcq')
const { getMcqByCriteria } = require('../Controllers/McqControllers/getMcqByCriteria')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('teacher'), createMcq)
router.get('/', getAllMcq)
router.post('/get-by-criteria', roleCheck('teacher'), getMcqByCriteria)


module.exports = router