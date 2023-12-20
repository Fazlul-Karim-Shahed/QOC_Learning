
const { createModule } = require('../Controllers/ModuleController/createModule')
const { getModules } = require('../Controllers/ModuleController/getModules')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createModule)
router.get('/:chapterId', getModules)


module.exports = router