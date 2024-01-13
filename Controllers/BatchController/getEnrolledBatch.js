
const { BatchModel } = require('../../Models/BatchModel')

const getEnrolledBatch = async (req, res) => {

    let batch = await BatchModel.find({ enrolledStudents: { $elemMatch: { studentId: req.params.studentId } } }).populate(['teacherId', 'enrolledStudents.studentId'])

    if (batch.length != 0) {
        res.status(200).send({ message: 'All batches', error: false, data: batch })
    }
    else {
        res.send({ message: 'No batch found', error: true })
    }

}

module.exports.getEnrolledBatch = getEnrolledBatch
