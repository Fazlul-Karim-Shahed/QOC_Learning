

const { addMcq } = require('../Controllers/McqControllers/addMcq')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('teacher'), addMcq)


module.exports = router