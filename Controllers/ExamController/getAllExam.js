




const { ExamModel } = require('../../Models/ExamModel');

const getAllExam = async (req, res) => {

    let exam = await ExamModel.find(req.body).populate(['subjectId', 'curriculumId', 'subjectId', 'moduleId', 'broadQuestionsId', 'mcqsId']).sort({ startTime: -1 });

    if (exam.length != 0) {
        res.status(200).send({ message: 'All exam ', error: false, data: exam })
    }
    else {
        res.send({ message: 'No exam found', error: true })
    }

}

module.exports.getAllExam = getAllExam
