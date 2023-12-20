



const { ChapterModel } = require('../../Models/ChapterModel')

const getChapters = async (req, res) => {

    let chapter = await ChapterModel.find({ subjectId: req.params.subjectId }).populate(['subjectId', 'curriculumId']);

    if (chapter.length != 0) {
        res.status(200).send({ message: 'All chapter ', error: false, data: chapter })
    }
    else {
        res.send({ message: 'No chapter found', error: true })
    }

}

module.exports.getChapters = getChapters
