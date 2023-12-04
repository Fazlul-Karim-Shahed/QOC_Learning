const { JobModel } = require("../../Models/JobModel")


const createJob = async (req, res) => {

    let allJob = await JobModel.find()

    let data = req.body

    if(req.user.role === "admin"){
        data["approved"] = true
    }

    data["jobId"] = allJob.length


    data = new JobModel(req.body)

    data.save().then(data => {

        res.status(200).send({ message: 'Job Created Successfully', error: false, data: data })

    })
        .catch(err => {
            res.status(500).send({ message: 'Job Created Error', error: true, data: err.message })
        })
        


}

module.exports.createJob = createJob
