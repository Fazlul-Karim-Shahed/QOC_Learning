
const { default: mongoose } = require('mongoose');
const { ExamModel } = require('../../Models/ExamModel');

const getAExamMarks = async (req, res) => {

    // console.log(new mongoose.Types.ObjectId(req.params.studentId))/

    ExamModel.findOne({ _id: req.params.examId, participants: { $elemMatch: { studentId: req.params.studentId } } }).populate(['subjectId', 'curriculumId', 'subjectId', 'moduleId']).then(data => {

        if (data) {

            let participantObj = {}

            for (let i in data.participants) {

                if (data.participants[i]['studentId'].equals(req.params.studentId)) {
                    participantObj = { ...data.participants[i] }
                    break
                }
            }

            return res.send({ message: 'Exam script found', error: false, data: req.user.role === 'admin' ? data : participantObj })
        }
        else return res.send({ message: 'Exam script not found', error: true })

    })
        .catch(err => {

            return res.send({ message: 'Exam fetch failed', error: true, data: err.message })

        })

}

module.exports.getAExamMarks = getAExamMarks
