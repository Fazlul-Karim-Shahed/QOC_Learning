

const { createMcq } = require('../Controllers/McqControllers/createMcq')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('teacher'), createMcq)


module.exports = router