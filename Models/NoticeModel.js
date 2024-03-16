
const { model, Schema } = require('mongoose')

const NoticeModel = model('Notice', new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },

}, { timestamps: true }))


module.exports.NoticeModel = NoticeModel