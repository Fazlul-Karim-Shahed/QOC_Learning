const { model, Schema } = require('mongoose')

const ModuleModel = model('Module', new Schema({

    module: { type: String, required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject"},
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    paid: { type: Boolean, required: true, default: false },
    materials: [{ data: Buffer, contentType: String, type: Object, name: String }]

}, { timestamps: true }))


module.exports.ModuleModel = ModuleModel