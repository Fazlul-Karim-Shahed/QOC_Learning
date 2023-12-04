const { approveJob } = require('../Controllers/JobControllers/approveJob')
const { confirmJob } = require('../Controllers/JobControllers/confirmJob')
const { createJob } = require('../Controllers/JobControllers/createJob')
const { deleteJob } = require('../Controllers/JobControllers/deleteJob')
const { roleCheck } = require('../Middlewares/roleCheck')



const router = require('express').Router()

router.post('/create', roleCheck('student'), createJob)
router.put('/approve/:jobId', roleCheck('admin'), approveJob)
router.put("/confirm/:jobId", roleCheck('admin'), confirmJob)
router.delete('/:jobId', roleCheck('admin'), deleteJob) 


module.exports = router