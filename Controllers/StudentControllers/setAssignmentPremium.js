const { StudentModel } = require("../../Models/StudentModel")


const setAssignmentPremium = async (req, res) => {

    let student = await StudentModel.findOne({ _id: req.params.studentId })

    if (student) {

        student['assignment'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
        }

        student.save().then(data => {
            res.send({ message: 'Student is assigned for assignment Premium', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Failed to assigned student as Premium', error: true, data: err.message })

            })
    }
    else {
        res.status(404).send({ message: 'student not found', error: true })
    }

}

module.exports.setAssignmentPremium = setAssignmentPremium
