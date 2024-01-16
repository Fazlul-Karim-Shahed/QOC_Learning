



const { ChapterModel } = require('../../Models/ChapterModel')

const getAChapters = async (req, res) => {

    let chapter = await ChapterModel.findOne({ _id: req.params.chapterId }).populate(['subjectId', 'curriculumId']);

    if (chapter.length != 0) {
        res.status(200).send({ message: 'All chapter ', error: false, data: chapter })
    }
    else {
        res.send({ message: 'No chapter found', error: true })
    }

}

module.exports.getAChapters = getAChapters
