


const { CurriculumModel } = require('../../Models/CurriculumModel')

const getAllCurriculum = async (req, res) => {

    let curriculum = await CurriculumModel.find()

    if (curriculum.length != 0) {
        res.status(200).send({ message: 'All curriculums', error: false, data: curriculum })
    }
    else {
        res.send({ message: 'No curriculum found', error: true })
    }

}

module.exports.getAllCurriculum = getAllCurriculum
