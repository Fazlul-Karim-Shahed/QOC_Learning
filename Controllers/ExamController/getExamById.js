

const { ExamModel } = require('../../Models/ExamModel')
const { StudentModel } = require('../../Models/StudentModel')
const { checkEmail } = require('../checkEmail')
const { cleanObject } = require('../cleanObject')

const getExamById = async (req, res) => {


    if (req.user.toObject().hasOwnProperty('course') && req.user.course.isPremium) {

        ExamModel.find({}).populate(['subjectId', 'curriculumId', 'subjectId', 'moduleId', 'broadQuestionsId', 'mcqsId'])
            .sort({ startTime: -1 }).then(data => {
                res.status(200).send({ message: 'All exam', error: false, data: data })
            }).catch(err => {
                res.send({ message: 'No exam found', error: true, data: err.message })
            })

    }
    else {

        ExamModel.find({}).populate(['subjectId', 'curriculumId', 'subjectId', 'moduleId', 'broadQuestionsId', 'mcqsId']).then(data => {

            let freeExam = []
            for (let i = 0; i < data.length; i++) {

                if ((data[i].moduleId && data[i].moduleId.paid) || (data[i].chapterId && data[i].chapterId.paid) || (data[i].subjectId && data[i].subjectId.paid)) {

                    continue
                }
                else {
                    freeExam.push(data[i])
                }


            }

            res.status(200).send({ message: 'All Exam', error: false, data: freeExam })
        }).catch(err => {
            res.send({ message: 'No Exam found', error: true, data: err.message })
        })



    }


}

module.exports.getExamById = getExamById
