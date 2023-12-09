
const { JobModel } = require("../../Models/JobModel")


const applyJob = async (req, res) => {

    console.log(req.body, req.params)

    let job = await JobModel.findOne({ _id: req.params.jobId })

    // let job = await JobModel.updateOne({ _id: req.params.jobId }, {  })

    if (job) {

        // let arr = .push()
        job['applicants'] = [...job.applicants, req.body._id]

        console.log(job)

        job.save().then(data => {
            res.send({ message: 'Successfully applied the job', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Application failed', error: true, data: err.message })

            })
    }
    else {
        res.status(404).send({ message: 'Job not found', error: true })
    }

}

module.exports.applyJob = applyJob
