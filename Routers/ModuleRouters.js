
const { createModule } = require('../Controllers/ModuleController/createModule')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin') ,createModule)


module.exports = router