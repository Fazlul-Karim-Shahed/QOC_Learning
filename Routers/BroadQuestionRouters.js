

const { createBroadQuestion } = require('../Controllers/BroadQuestionController/createBroadQuestion')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createBroadQuestion)


module.exports = router