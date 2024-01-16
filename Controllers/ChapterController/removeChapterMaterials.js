
const { ChapterModel } = require('../../Models/ChapterModel')
const _ = require('lodash')


const removeChapterMaterials = async (req, res) => {

    let chapter = await ChapterModel.findOne({ _id: req.params.chapterId })

    chapter['materials'].splice(req.params.position, 1)

    chapter.save().then(data => {

        res.send({ message: 'material removed successfully', error: false, data: data });
    }).catch(err => {

        res.send({ message: 'material removal failed', error: true, data: err });
    })



}


module.exports.removeChapterMaterials = removeChapterMaterials

