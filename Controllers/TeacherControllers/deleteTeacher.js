

const { TeacherModel } = require('../../Models/TeacherModel')

const deleteTeacher = async (req, res) => {

    let teacher = await TeacherModel.deleteOne({ _id: req.params.teacherId })

    if (Teacher) {

        res.status(200).send({ message: 'Teacher Deleted', error: false, data: teacher })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }

}

module.exports.deleteTeacher = deleteTeacher
