const { model, Schema } = require('mongoose')

const BatchModel = model('Batch', Schema({

    teacherId: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    fees: { type: Number, required: true },

    enrolledStudents: [{
        studentId: { type: Schema.Types.ObjectId, ref: "Student" },
        description: { type: String, default: 'I want admission in your batch', required: true },
        createdAt: { type: Date, required: true, default: Date.now() },
    }],
    // isActive: { type: Boolean, default: true, required: true },

}, { timestamps: true }))


module.exports.BatchModel = BatchModel