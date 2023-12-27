


const { ExamModel } = require('../../Models/ExamModel');

const getAExam = async (req, res) => {

    let exam = await ExamModel.findOne({ _id: req.params.examId }).populate(['subjectId', 'curriculumId', 'subjectId', 'moduleId', 'participants.studentId']);

    if (exam) {
        res.status(200).send({ message: 'Exam found', error: false, data: exam })
    }
    else {
        res.send({ message: 'Exam not found', error: true })
    }

}

module.exports.getAExam = getAExam
