
const { model, Schema } = require('mongoose')

const BroadQuestionModel = model('BroadQuestion', new Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },

    question: { type: String, required: true },
    questionAttachment: {contentType: String, type: Object, name: String },
    answer: { type: String },
    answerAttachment: {contentType: String, type: Object, name: String },
    difficulty: { type: String, required: true, default: 'easy', enum: ['easy', 'medium', 'hard'] },

}, { timestamps: true }))


module.exports.BroadQuestionModel = BroadQuestionModel