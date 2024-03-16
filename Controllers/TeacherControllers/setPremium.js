const { TeacherModel } = require("../../Models/TeacherModel")


const setPremium = async (req, res) => {

    let teacher = await TeacherModel.findOne({ _id: req.params.teacherId })

    if (teacher) {

        teacher['batch'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleString(),
        }

        teacher.save().then(data => {
            res.send({ message: 'Teacher is assigned as Premium', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Failed to assigned teacher as Premium', error: true, data: err.message })

            })
    }
    else {
        res.status(404).send({ message: 'teacher not found', error: true })
    }

}

module.exports.setPremium = setPremium
