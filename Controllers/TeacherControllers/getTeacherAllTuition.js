

const { JobModel } = require('../../Models/JobModel')

const getTeacherAllTuition = async (req, res) => {

    let job = await JobModel.find({ confirmedTeacherId: req.params.confirmedTeacherId, confirmed: true })

    if (job.length != 0) {
        res.status(200).send({ message: 'All tuitions', error: false, data: job })
    }
    else {
        res.status(404).send({ message: 'No tuition found found', error: true })
    }


}

module.exports.getTeacherAllTuition = getTeacherAllTuition
