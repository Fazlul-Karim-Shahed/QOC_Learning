
const { ModuleModel } = require('../../Models/ModuleModel')
const { ChapterModel } = require('../../Models/ChapterModel')
const { ExamModel } = require('../../Models/ExamModel')
const { MCQModel } = require('../../Models/McqModel')
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')
const { FocusModel } = require('../../Models/FocusModel')

const deleteChapter = async (req, res) => {

    let exam = await ExamModel.deleteMany({ chapterId: req.params.chapterId })
    let mcq = await MCQModel.deleteMany({ chapterId: req.params.chapterId })
    let bq = await BroadQuestionModel.deleteMany({ chapterId: req.params.chapterId })
    let module = await ModuleModel.deleteMany({ chapterId: req.params.chapterId })
    let focus = await FocusModel.deleteMany({ chapterId: req.params.chapterId })

    ChapterModel.deleteOne({ _id: req.params.chapterId}).then(data => {
        res.status(200).send({
            message: 'Chapter deleted ', error: false, data: {
                data: data,
                exam: exam,
                mcq: mcq,
                bq: bq,
                module: module,
                focus: focus
            }
        })
    }).catch(err => {
        res.send({ message: 'Chapter not deleted', error: true, data: err.message })
    })


}

module.exports.deleteChapter = deleteChapter
