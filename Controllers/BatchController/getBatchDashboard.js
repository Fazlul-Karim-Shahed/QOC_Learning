


const { BatchModel } = require('../../Models/BatchModel')

const getBatchDashboard = async (req, res) => {

    let query = req.user.role === 'student' ? { _id: req.params.batchId, enrolledStudents: { $elemMatch: { studentId: req.user._id } } } : { _id: req.params.batchId }

    let batch = await BatchModel.findOne(query).populate(['teacherId', 'enrolledStudents.studentId'])

    if (batch) {
        res.status(200).send({ message: 'Batch dashboard found', error: false, data: batch })
    }
    else {
        throw Error("access denied")
        // res.send({ message: 'You are not enrolled this batch', error: true })
    }

}

module.exports.getBatchDashboard = getBatchDashboard
