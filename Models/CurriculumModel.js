const { model, Schema } = require('mongoose')

const CurriculumModel = model('Curriculum', new Schema({
    curriculum: { type: String, required: true },
    outlines: [{ data: Buffer, contentType: String, type: Object, name: String }],

}, { timestamps: true }))


module.exports.CurriculumModel = CurriculumModel