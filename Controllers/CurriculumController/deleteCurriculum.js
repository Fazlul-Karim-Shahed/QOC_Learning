

const { ModuleModel } = require('../../Models/ModuleModel')
const { ChapterModel } = require('../../Models/ChapterModel')
const { ExamModel } = require('../../Models/ExamModel')
const { MCQModel } = require('../../Models/McqModel')
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')
const { SubjectModel } = require('../../Models/SubjectModel')
const { CurriculumModel } = require('../../Models/CurriculumModel')
const { FocusModel } = require('../../Models/FocusModel')


const deleteCurriculum = async (req, res) => {

    let exam = await ExamModel.deleteMany({ curriculumId: req.params.curriculumId })
    let mcq = await MCQModel.deleteMany({ curriculumId: req.params.curriculumId })
    let bq = await BroadQuestionModel.deleteMany({ curriculumId: req.params.curriculumId })
    let chapter = await ChapterModel.deleteMany({ curriculumId: req.params.curriculumId })
    let module = await ModuleModel.deleteMany({ curriculumId: req.params.curriculumId })
    let subject = await SubjectModel.deleteMany({ curriculumId: req.params.curriculumId })
    let focus = await FocusModel.deleteMany({ curriculumId: req.params.curriculumId })

    CurriculumModel.deleteOne({ _id: req.params.curriculumId}).then(data => {
        res.status(200).send({
            message: 'Curriculum deleted succefully', error: false, data: {
                data: data,
                exam: exam,
                mcq: mcq,
                bq: bq,
                module: module,
                chapter: chapter,
                subject: subject,
                focus: focus
            }
        })
    }).catch(err => {
        res.send({ message: 'Curriculum not deleted', error: true, data: err.message })
    })


}

module.exports.deleteCurriculum = deleteCurriculum
