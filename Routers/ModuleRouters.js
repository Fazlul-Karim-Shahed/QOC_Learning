
const { addModuleMaterials } = require('../Controllers/ModuleController/addModuleMaterials')
const { createModule } = require('../Controllers/ModuleController/createModule')
const { getAModule } = require('../Controllers/ModuleController/getAModule')
const { getModules } = require('../Controllers/ModuleController/getModules')
const { removeModuleMaterials } = require('../Controllers/ModuleController/removeModuleMaterials')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createModule)
router.get('/:chapterId', getModules)


router.get('/get-module/:moduleId', getAModule)

router.put('/add-material/:moduleId', roleCheck('admin'), addModuleMaterials)
router.put('/remove-material/:moduleId/:position', roleCheck('admin'), removeModuleMaterials)



module.exports = router