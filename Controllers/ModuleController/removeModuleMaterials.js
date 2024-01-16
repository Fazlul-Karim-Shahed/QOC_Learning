
const { ModuleModel } = require('../../Models/ModuleModel')
const _ = require('lodash')


const removeModuleMaterials = async (req, res) => {

    let module = await ModuleModel.findOne({ _id: req.params.moduleId })

    module['materials'].splice(req.params.position, 1)

    module.save().then(data => {

        res.send({ message: 'material removed successfully', error: false, data: data });
    }).catch(err => {

        res.send({ message: 'material removal failed', error: true, data: err });
    })



}


module.exports.removeModuleMaterials = removeModuleMaterials

