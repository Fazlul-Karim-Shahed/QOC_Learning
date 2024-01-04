

const { AssignmentModel } = require('../../Models/AssignmentModel')

const getAllAssignment = async (req, res) => {

    let assignment = await AssignmentModel.find(req.body).populate(['studentId'])

    if (assignment.length != 0) {
        res.status(200).send({ message: 'All assignments', error: false, data: assignment })
    }
    else {
        res.send({ message: 'No assignment found found', error: true })
    }

}

module.exports.getAllAssignment = getAllAssignment
