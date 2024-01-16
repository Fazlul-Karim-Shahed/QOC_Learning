



const { ModuleModel } = require('../../Models/ModuleModel')

const getAModule = async (req, res) => {

    let module = await ModuleModel.findOne({ _id: req.params.moduleId }).populate(['subjectId', 'curriculumId']);

    if (module) {
        res.status(200).send({ message: 'Module found ', error: false, data: module })
    }
    else {
        res.send({ message: 'Module not found', error: true })
    }

}

module.exports.getAModule = getAModule
