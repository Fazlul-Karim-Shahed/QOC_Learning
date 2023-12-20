


const { MCQModel } = require('../../Models/McqModel')
const { cleanObject } = require('../cleanObject')

const getMcqByCriteria = async (req, res) => {

    let mcq = await MCQModel.find(cleanObject(req.body)).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId'])

    if (mcq.length != 0) {
        res.status(200).send({ message: 'All mcq', error: false, data: mcq })
    }
    else {
        res.send({ message: 'No mcq found found', error: true })
    }

}

module.exports.getMcqByCriteria = getMcqByCriteria
