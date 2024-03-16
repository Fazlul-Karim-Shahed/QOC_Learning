

const { BatchModel } = require('../../Models/BatchModel')

const deleteBatch = async (req, res) => {

    let batch = await BatchModel.deleteOne({ _id: req.params.batchId })

    if (batch) {

        res.status(200).send({ message: 'batch Deleted', error: false, data: batch })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }

}

module.exports.deleteBatch = deleteBatch
