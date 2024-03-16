
const { TuitionModel } = require("../../Models/TuitionModel")


const approveTuition = async (req, res) => {

    let tuition = await TuitionModel.updateOne({ _id: req.params.tuitionId }, { approved: true })

    if (tuition.modifiedCount != 0) {
        res.status(200).send({ message: 'Tuition successfully approved', error: false, data: tuition })
    }
    else {
        res.send({ message: 'Tuition not found', error: true })
    }

}

module.exports.approveTuition = approveTuition
