


const { StudentModel } = require('../../Models/StudentModel')
const { cleanObject } = require('../cleanObject')

const updateStudent = async (req, res) => {

    let updatedData = cleanObject(req.body)

    let student = await StudentModel.findOneAndUpdate({ _id: req.params.studentId }, updatedData)

    res.send({ message: 'Update successfully', error: true, data: student })

}

module.exports.updateStudent = updateStudent
