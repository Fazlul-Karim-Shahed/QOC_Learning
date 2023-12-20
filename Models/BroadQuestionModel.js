
const { model, Schema } = require('mongoose')

const BroadQuestionModel = model('BroadQuestion', Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },

    question: { type: String, required: true },
    answer: { type: String },
    hints: { type: String },
    difficulty: { type: String, required: true, default: 'easy', enum: ['easy', 'medium', 'hard'] },
    tags: [{ type: String }],

    


}, { timestamps: true }))


module.exports.BroadQuestionModel = BroadQuestionModel