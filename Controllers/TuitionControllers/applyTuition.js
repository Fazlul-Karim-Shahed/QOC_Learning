
const { TuitionModel } = require("../../Models/TuitionModel")


const applyTuition = async (req, res) => {

    let tuition = await TuitionModel.findOne({ _id: req.params.tuitionId })

    if (tuition) {

        // let arr = .push()
        tuition['applicants'] = [...tuition.applicants, req.body._id]

        tuition.save().then(data => {
            res.send({ message: 'Successfully applied the tuition', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Application failed', error: true, data: err.message })

            })
    }
    else {
        res.status(404).send({ message: 'Tuition not found', error: true })
    }

}

module.exports.applyTuition = applyTuition
