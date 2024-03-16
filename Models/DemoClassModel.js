
const { model, Schema } = require('mongoose')

const DemoClassModel = model('DemoClass', new Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    classTime: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String },
    classLink: { type: String, required: true }

}, { timestamps: true }))


module.exports.DemoClassModel = DemoClassModel
