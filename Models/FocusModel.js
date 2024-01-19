


const { model, Schema } = require('mongoose')

const FocusModel = model('Focus', new Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    title: { type: String, required: true },
    description: { type: String },
    attachment: { data: Buffer, contentType: String, type: Object, name: String, required: true }

}, { timestamps: true }))


module.exports.FocusModel = FocusModel
