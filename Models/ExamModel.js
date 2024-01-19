

const { model, Schema } = require('mongoose')

const ExamModel = model('Exam', new Schema({

    exam: { type: String, required: true },
    chapterId: { type: Schema.Types.ObjectId, ref: "Chapter" },
    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    moduleId: { type: Schema.Types.ObjectId, ref: "Module" },

    mcqsId: [{ type: Schema.Types.ObjectId, ref: "MCQ" }],
    broadQuestionsId: [{ type: Schema.Types.ObjectId, ref: "BroadQuestion" }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    negativeMarking: { type: Number, required: true },
    perMcqMarks: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    solution: { data: Buffer, contentType: String, type: Object, name: String },

    participants: [{
        studentId: { type: Schema.Types.ObjectId, ref: "Student" },
        mcqMarks: { type: Number },
        correctMcq: { type: Number },
        wrongMcq: { type: Number },
        noAnswer: { type: Number },
        broadQuestionMarks: { type: Number },
        script: { data: Buffer, contentType: String, type: Object, name: String },
        position: { type: Number },
    }],


}, { timestamps: true }))


module.exports.ExamModel = ExamModel
