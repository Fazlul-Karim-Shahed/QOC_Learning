

const { BatchModel } = require('../../Models/BatchModel')

const getAllBatch = async (req, res) => {

    let batch = await BatchModel.find(req.body).populate(['teacherId', 'enrolledStudents.studentId'])

    if (batch.length != 0) {
        res.status(200).send({ message: 'All enrolled batches', error: false, data: batch })
    }
    else {
        res.send({ message: 'No enrolled batch found', error: true })
    }

}

module.exports.getAllBatch = getAllBatch
