const { model, Schema } = require('mongoose')

const ChapterModel = model('Chapter', Schema({

    chapter: { type: String, required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    paid: { type: Boolean, required: true, default: false },
    materials: [{ data: Buffer, contentType: String, type: Object, name: String }]

}, { timestamps: true }))


module.exports.ChapterModel = ChapterModel