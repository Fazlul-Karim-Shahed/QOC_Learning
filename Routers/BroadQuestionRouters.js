

const { addBroadQuestion } = require('../Controllers/BroadQuestionController/addBroadQuestion')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), addBroadQuestion)


module.exports = router