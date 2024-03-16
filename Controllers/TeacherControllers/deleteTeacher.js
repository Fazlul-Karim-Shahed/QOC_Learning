

const { TeacherModel } = require('../../Models/TeacherModel')
const { TuitionModel } = require('../../Models/TuitionModel')
const { TransactionModel } = require('../../Models/TransactionModel')
const { BatchModel } = require('../../Models/BatchModel')

const deleteTeacher = async (req, res) => {

    let transaction = await TransactionModel.deleteOne({ "userInfo.userId": req.params.teacherId })
    let tuition = await TuitionModel.deleteOne({ confirmedTeacherId: req.params.teacherId })
    let batch = await BatchModel.deleteOne({ teacherId: req.params.teacherId })


    TeacherModel.deleteOne({ _id: req.params.teacherId }).then(data => {
         res.status(200).send({ message: 'Teacher Deleted', error: false, data: data })
    }).catch(err => {
        res.send({ message: err.message, error: true })
    })

}

module.exports.deleteTeacher = deleteTeacher
