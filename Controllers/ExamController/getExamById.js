

const { ExamModel } = require('../../Models/ExamModel')
const { StudentModel } = require('../../Models/StudentModel')
const { cleanObject } = require('../cleanObject')

const getExamById = async (req, res) => {


    let student = await StudentModel.findOne({_id: req.params.studentId})

    if (student && student.toObject().hasOwnProperty('curriculumId')){ 

        let exam = await ExamModel.find({ curriculumId: student['curriculumId'] }).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId', 'mcqsId', 'broadQuestionsId'])

        if (exam.length != 0) {
            res.status(200).send({ message: 'All exam', error: false, data: exam })
        }
        else {
            res.send({ message: 'No exam found', error: true })
        }
    }
    else{
        res.send({ message: 'Curriculum not updated. Please update your profile', error: true})
    }

}

module.exports.getExamById = getExamById
