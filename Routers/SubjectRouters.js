
const { createSubject } = require('../Controllers/SubjectController/createSubject')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/',roleCheck('admin'), createSubject)


module.exports = router