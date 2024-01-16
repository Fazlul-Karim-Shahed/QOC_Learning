



const { SubjectModel } = require('../../Models/SubjectModel')

const getASubject = async (req, res) => {

    let subjects = await SubjectModel.findOne({ _id: req.params.subjectId }).populate(['curriculumId'])

    if (subjects) {
        res.status(200).send({ message: 'Subject found', error: false, data: subjects })
    }
    else {
        res.send({ message: 'Subject not found', error: true })
    }

}

module.exports.getASubject = getASubject
