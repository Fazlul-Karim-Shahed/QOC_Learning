
const { model, Schema } = require('mongoose')

const MCQModel = model('MCQ', Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", required: true },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
    
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
    hints: { type: String },
    explanation: { type: String },
    difficulty: { type: String, required: true, default: 'easy', enum: ['easy', 'medium', 'hard'] },
    tags: [{ type: String }],
    
    
}, { timestamps: true }))


module.exports.MCQModel = MCQModel