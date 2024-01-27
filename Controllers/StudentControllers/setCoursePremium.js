const { StudentModel } = require("../../Models/StudentModel")


const setCoursePremium = async (req, res) => {

    let student = await StudentModel.findOne({ _id: req.params.studentId })

    if (student) {

        student['course'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
        }

        student.save().then(data => {
            res.send({ message: 'Student is assigned for course Premium', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Failed to assigned student as Premium', error: true, data: err.message })

            })
    }
    else {
        res.send({ message: 'student not found', error: true })
    }

}

module.exports.setCoursePremium = setCoursePremium
