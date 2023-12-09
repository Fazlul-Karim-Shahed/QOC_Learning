
const { addSubject } = require('../Controllers/SubjectController/addSubject')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/',roleCheck('admin'), addSubject)


module.exports = router