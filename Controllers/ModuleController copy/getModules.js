



const { ModuleModel } = require('../../Models/ModuleModel')

const getModules = async (req, res) => {

    let module = await ModuleModel.find({ chapterId: req.params.chapterId }).populate(['subjectId', 'curriculumId', 'chapterId']);

    if (module.length != 0) {
        res.status(200).send({ message: 'All module ', error: false, data: module })
    }
    else {
        res.send({ message: 'No module found', error: true })
    }

}

module.exports.getModules = getModules
