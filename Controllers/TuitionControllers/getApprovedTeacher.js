

const { TuitionModel } = require('../../Models/TuitionModel')

const getApprovedTuition = async (req, res) => {

    let tuition = await TuitionModel.find({ approved: true, confirmed: false })

    if (tuition.length != 0) {
        res.status(200).send({ message: 'All tuitions', error: false, data: tuition })
    }
    else {
        res.send({ message: 'No tuition found', error: true })
    }


}

module.exports.getApprovedTuition = getApprovedTuition
