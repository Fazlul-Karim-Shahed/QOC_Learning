

const { StudentModel } = require('../../Models/StudentModel')
const { AssignmentModel } = require('../../Models/AssignmentModel')
const { TuitionModel } = require('../../Models/TuitionModel')
const { TransactionModel } = require('../../Models/TransactionModel')
const { ExamModel } = require('../../Models/ExamModel')
const { default: mongoose } = require('mongoose')

const deleteStudent = async (req, res) => {

    let assigment = await AssignmentModel.deleteMany({ studentId: new mongoose.Types.ObjectId(req.params.studentId) })
    let tuition = await TuitionModel.deleteMany({ studentId: new mongoose.Types.ObjectId(req.params.studentId) })
    let transaction = await TransactionModel.deleteMany({ "userInfo.userId": new mongoose.Types.ObjectId(req.params.studentId) })

    StudentModel.deleteOne({ _id: req.params.studentId }).then(data => {
        res.status(200).send({ message: 'Student Deleted', error: false, data: data })
    }).catch(err => {
        res.status(500).send({ message: err.message, error: true, data: err.message })
    })



}

module.exports.deleteStudent = deleteStudent
