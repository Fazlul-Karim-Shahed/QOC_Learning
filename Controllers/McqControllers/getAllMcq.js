


const { MCQModel } = require('../../Models/McqModel')

const getAllMcq = async (req, res) => {

    let mcq = await MCQModel.find().populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId'])

    if (mcq.length != 0) {
        res.status(200).send({ message: 'All mcq', error: false, data: mcq })
    }
    else {
        res.send({ message: 'No curriculum found found', error: true })
    }

}

module.exports.getAllMcq = getAllMcq
