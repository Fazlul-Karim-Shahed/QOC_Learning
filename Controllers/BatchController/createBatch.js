const { BatchModel } = require("../../Models/BatchModel")

const createBatch = async (req, res) => {

    if (req.user.isPremium) {

        let batch = new BatchModel(req.body)
        
        batch.save().then(data => {
            res.send({ message: 'Batch successfully created', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Batch creation failed', error: true, data: err.message })
            })


    }
    else {
        return res.status(401).send({ message: "You are not authorized to perform this action", error: true })
    }



}

module.exports.createBatch = createBatch
