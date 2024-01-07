

const { TeacherModel } = require('../../Models/TeacherModel')

const getTeacher = async (req, res) => {

    let teacher = await TeacherModel.find(req.body)

    if (teacher.length != 0) {
        res.status(200).send({ message: 'All teachers', error: false, data: teacher })
    }
    else {
        res.send({ message: 'No teacher found found', error: true })
    }


}

module.exports.getTeacher = getTeacher
