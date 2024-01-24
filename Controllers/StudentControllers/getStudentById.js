

const { StudentModel } = require('../../Models/StudentModel')

const getStudentById = async (req, res) => {

    let student = await StudentModel.findOne({_id: req.params.studentId})

    if (student) {
        res.status(200).send({ message: 'Student found', error: false, data: student })
    }
    else {
        res.send({ message: 'Student not found', error: true })
    }

}

module.exports.getStudentById = getStudentById
