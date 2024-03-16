
const { ModuleModel } = require('../../Models/ModuleModel')
const { ExamModel } = require('../../Models/ExamModel')
const { MCQModel } = require('../../Models/McqModel')
const { FocusModel } = require('../../Models/FocusModel')
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')

const deleteModule = async (req, res) => {

    await ExamModel.deleteMany({ moduleId: req.params.moduleId })
    await MCQModel.deleteMany({ moduleId: req.params.moduleId })
    await BroadQuestionModel.deleteMany({ moduleId: req.params.moduleId })
    await focusModel.deleteMany({ moduleId: req.params.moduleId })

    ModuleModel.deleteOne({ _id: req.params.moduleId }).then(data => {
        res.status(200).send({ message: 'Module deleted ', error: false, data: data })
    }).catch(err => {
        res.send({ message: 'Module not deleted', error: true, data: err.message })
    })


}

module.exports.deleteModule = deleteModule
