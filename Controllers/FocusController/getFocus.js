

const { FocusModel } = require('../../Models/FocusModel')

const getFocus = async (req, res) => {

    let focus = await FocusModel.find(req.body).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId'])

    if (focus.length != 0) {

        res.status(200).send({ message: 'All focus', error: false, data: focus })
    }
    else {
        res.send({ message: 'No focus found found', error: true })
    }

}

module.exports.getFocus = getFocus
