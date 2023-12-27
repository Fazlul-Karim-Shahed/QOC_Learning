
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')
const { cleanObject } = require('../cleanObject')


const getBroadQuestion = async (req, res) => {

    let broadQuestion = await BroadQuestionModel.find(cleanObject(req.body)).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId'])

    if (broadQuestion.length != 0) {
        res.status(200).send({ message: 'All broadQuestion', error: false, data: broadQuestion })
    }
    else {
        res.send({ message: 'No broadQuestion found', error: true })
    }

}

module.exports.getBroadQuestion = getBroadQuestion
