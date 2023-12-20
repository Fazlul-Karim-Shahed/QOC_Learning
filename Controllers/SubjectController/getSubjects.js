



const { SubjectModel } = require('../../Models/SubjectModel')

const getSubjects = async (req, res) => {

    let subjects = await SubjectModel.find({ curriculumId: req.params.curriculumId }).populate(['curriculumId'])

    if (subjects.length != 0) {
        res.status(200).send({ message: 'All Subjects ', error: false, data: subjects })
    }
    else {
        res.send({ message: 'No Subjects found', error: true })
    }

}

module.exports.getSubjects = getSubjects
