

const { TuitionModel } = require('../../Models/TuitionModel')

const confirmTuition = async (req, res) => {

    let tuition = await TuitionModel.updateOne({ _id: req.params.tuitionId, approved: true }, { confirmed: true, confirmedTeacherId: req.body.confirmedTeacherId })

    if (tuition.modifiedCount != 0) {
        res.status(200).send({ message: 'Tuition successfully confirmed', error: false, data: tuition })
    }
    else {
        res.status(404).send({ message: 'Tuition not found', error: true })
    }


}

module.exports.confirmTuition = confirmTuition
