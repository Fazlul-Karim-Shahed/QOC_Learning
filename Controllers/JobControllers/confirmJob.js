

const { JobModel } = require('../../Models/JobModel')

const confirmJob = async (req, res) => {

    let job = await JobModel.updateOne({ _id: req.params.jobId, approved: true }, { confirmed: true, confirmedTeacherId: req.body.confirmedTeacherId })

    if (job.modifiedCount != 0) {
        res.status(200).send({ message: 'Job successfully confirmed', error: false, data: job })
    }
    else {
        res.status(404).send({ message: 'Job not found', error: true })
    }


}

module.exports.confirmJob = confirmJob
