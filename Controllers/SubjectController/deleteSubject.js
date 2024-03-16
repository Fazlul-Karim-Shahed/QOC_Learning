
const { ModuleModel } = require('../../Models/ModuleModel')
const { ChapterModel } = require('../../Models/ChapterModel')
const { ExamModel } = require('../../Models/ExamModel')
const { MCQModel } = require('../../Models/McqModel')
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')
const { SubjectModel } = require('../../Models/SubjectModel')
const { FocusModel } = require('../../Models/FocusModel')

const deleteSubject = async (req, res) => {

    let exam = await ExamModel.deleteMany({ subjectId: req.params.subjectId })
    let mcq = await MCQModel.deleteMany({ subjectId: req.params.subjectId })
    let bq = await BroadQuestionModel.deleteMany({ subjectId: req.params.subjectId })
    let chapter = await ChapterModel.deleteMany({ subjectId: req.params.subjectId })
    let module = await ModuleModel.deleteMany({ subjectId: req.params.subjectId })
    let focus = await FocusModel.deleteMany({ subjectId: req.params.subjectId })

    SubjectModel.deleteOne({ _id: req.params.subjectId}).then(data => {
        res.status(200).send({
            message: 'Subject deleted succefully', error: false, data: {
                data: data,
                exam: exam,
                mcq: mcq,
                bq: bq,
                module: module,
                chapter: chapter,
                focus: focus
            }
        })
    }).catch(err => {
        res.send({ message: 'Subject not deleted', error: true, data: err.message })
    })


}

module.exports.deleteSubject = deleteSubject
