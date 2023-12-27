

const { createBroadQuestion } = require('../Controllers/BroadQuestionController/createBroadQuestion')
const { getBroadQuestion } = require('../Controllers/BroadQuestionController/getBroadQuestion')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createBroadQuestion)
router.post('/get', getBroadQuestion)


module.exports = router