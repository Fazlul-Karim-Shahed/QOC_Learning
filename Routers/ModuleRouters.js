
const { addModule } = require('../Controllers/ModuleController/addModule')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin') ,addModule)


module.exports = router