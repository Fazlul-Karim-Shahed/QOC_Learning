

const { ModuleModel } = require('../../Models/ModuleModel')
const { ChapterModel } = require('../../Models/ChapterModel')
const { ExamModel } = require('../../Models/ExamModel')
const { MCQModel } = require('../../Models/McqModel')
const { BroadQuestionModel } = require('../../Models/BroadQuestionModel')
const { SubjectModel } = require('../../Models/SubjectModel')
const { CurriculumModel } = require('../../Models/CurriculumModel')
const { FocusModel } = require('../../Models/FocusModel')
const { StudentModel } = require('../../Models/StudentModel')
const { TeacherModel } = require('../../Models/TeacherModel')
const { NoticeModel } = require('../../Models/NoticeModel')
const { DemoClassModel } = require('../../Models/DemoClassModel')
const { UpcomingCourseModel } = require('../../Models/UpcomingCourseModel')


const deleteCurriculum = async (req, res) => {

    let exam = await ExamModel.deleteMany({ curriculumId: req.params.curriculumId })
    let mcq = await MCQModel.deleteMany({ curriculumId: req.params.curriculumId })
    let bq = await BroadQuestionModel.deleteMany({ curriculumId: req.params.curriculumId })
    let chapter = await ChapterModel.deleteMany({ curriculumId: req.params.curriculumId })
    let module = await ModuleModel.deleteMany({ curriculumId: req.params.curriculumId })
    let subject = await SubjectModel.deleteMany({ curriculumId: req.params.curriculumId })
    let focus = await FocusModel.deleteMany({ curriculumId: req.params.curriculumId })
    let students = await StudentModel.deleteMany({ curriculumId: req.params.curriculumId })
    let notice = await NoticeModel.deleteMany({ curriculumId: req.params.curriculumId })
    let demoClass = await DemoClassModel.deleteMany({ curriculumId: req.params.curriculumId })
    let upcoming = await UpcomingCourseModel.deleteMany({ curriculumId: req.params.curriculumId })


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
                focus: focus,
                students: students,
                teacher: teacher,
                notice: notice,
                demoClass: demoClass,
                upcoming: upcoming
            }
        })
    }).catch(err => {
        res.send({ message: 'Curriculum not deleted', error: true, data: err.message })
    })


}

module.exports.deleteCurriculum = deleteCurriculum
