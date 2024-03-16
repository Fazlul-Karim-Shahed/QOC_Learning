



const { ExamModel } = require('../../Models/ExamModel')

const deleteExam = async (req, res) => {

    let exam = await ExamModel.deleteOne({ _id: req.params.examId })

    if (exam) {

        res.status(200).send({ message: 'Exam Deleted', error: false, data: exam })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }

}

module.exports.deleteExam = deleteExam
