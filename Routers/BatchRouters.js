
const { createBatch } = require('../Controllers/BatchController/createBatch')
const { enrollBatch } = require('../Controllers/BatchController/enrollBatch')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('teacher'), createBatch)
router.put('/enroll/:batchId', roleCheck('student'), enrollBatch)


module.exports = router