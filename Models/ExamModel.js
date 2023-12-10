

const { model, Schema } = require('mongoose')

const ExamModel = model('Exam', Schema({

    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },

    mcq: [{ type: Schema.Types.ObjectId, ref: "MCQ" }],
    descriptive: [{ type: Schema.Types.ObjectId, ref: "DescriptiveQuestion" }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    participants: [{
        studentId: { type: Schema.Types.ObjectId },
        ref: "Student",
        mcqMarks: { type: Number },
        broadQuestionMarks: { type: Number },
        script: { data: Buffer, contentType: String, type: Object },
        position: { type: Number },

    }],


}, { timestamps: true }))


module.exports.ExamModel = ExamModel