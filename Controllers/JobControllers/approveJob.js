
const { JobModel } = require("../../Models/JobModel")


const approveJob = async (req, res) => {

    let job = await JobModel.updateOne({ _id: req.params.jobId }, { approved: true })

    if (job.modifiedCount != 0) {
        res.status(200).send({ message: 'Job successfully approved', error: false, data: job })
    }
    else {
        res.status(404).send({ message: 'Job not found', error: true })
    }

}

module.exports.approveJob = approveJob
