const { TeacherModel } = require("../../Models/TeacherModel")


const setPremium = async (req, res) => {

    console.log(req.params)

    let teacher = await TeacherModel.findOne({ _id: req.params.teacherId })

    if (teacher) {

        teacher['isPremium'] = req.body.isPremium
        teacher['premiumEnd'] = req.body.premiumEnd

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
