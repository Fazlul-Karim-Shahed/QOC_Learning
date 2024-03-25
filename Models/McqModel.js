
const { model, Schema } = require('mongoose')

const MCQModel = model('MCQ', new Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
    
    question: { type: String, required: true },
    questionAttachment: { contentType: String, type: Object, name: String },
    options: [{ option: String, value: String }],
    answer: { type: String, required: true },
    answerAttachment: { contentType: String, type: Object, name: String },
    hints: { type: String },
    explanation: { type: String },
    difficulty: { type: String, required: true, default: 'easy', enum: ['easy', 'medium', 'hard'] },
        
}, { timestamps: true }))


module.exports.MCQModel = MCQModel