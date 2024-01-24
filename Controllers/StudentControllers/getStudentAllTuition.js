

const { TuitionModel } = require('../../Models/TuitionModel')

const getStudentAllTuition = async (req, res) => {

    console.log(req.params)
    let tuition = await TuitionModel.find({ studentId: req.params.studentId, confirmed: true }).populate(['confirmedTeacherId'])

    if (tuition.length != 0) {
        res.status(200).send({ message: 'All tuitions', error: false, data: tuition })
    }
    else {
        res.send({ message: 'No tuition found found', error: true })
    }

}

module.exports.getStudentAllTuition = getStudentAllTuition
