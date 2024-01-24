

const { TuitionModel } = require('../../Models/TuitionModel')

const getAllTuition = async (req, res) => {

    let tuition = await TuitionModel.find().populate(['applicants'])

    if (tuition.length != 0) {
        res.status(200).send({ message: 'All tuitions', error: false, data: tuition })
    }
    else {
        res.send({ message: 'No tuition found found', error: true })
    }


}

module.exports.getAllTuition = getAllTuition
