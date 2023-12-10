

const { BatchModel } = require("../../Models/batchModel")


const enrollBatch = async (req, res) => {

    let batch = await BatchModel.findOne({ _id: req.params.batchId })

    if (batch) {

        batch['enrolledStudents'] = [...batch.enrolledStudents, {
            studentId: req.body._id,
            description: req.body.description
        }]

        batch.save().then(data => {
            res.send({ message: 'Successfully applied to the batch', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Application failed', error: true, data: err.message })

            })
    }
    else {
        res.status(404).send({ message: 'batch not found', error: true })
    }

}

module.exports.enrollBatch = enrollBatch
