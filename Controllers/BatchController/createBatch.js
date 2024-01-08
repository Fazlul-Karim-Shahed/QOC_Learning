const { BatchModel } = require("../../Models/BatchModel")

const createBatch = async (req, res) => {

    let batch = new BatchModel(req.body)

    batch.save().then(data => {
        res.send({ message: 'Batch successfully created', error: false, data: data })
    })
        .catch(err => {
            res.send({ message: 'Batch creation failed', error: true, data: err.message })
        })



}

module.exports.createBatch = createBatch
