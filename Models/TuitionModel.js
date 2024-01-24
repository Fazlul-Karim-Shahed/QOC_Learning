const { model, Schema } = require('mongoose')

const TuitionModel = model('Tuition', new Schema({

    // curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'Teacher'}],
    tuitionNumber: { type: Number, required: true }, // don't appear in frontend
    subject: { type: String, required: true },
    salary: { type: Number, required: true },
    time: { type: String, required: true },

    daysInWeek: { type: Number, required: true },
    language: { type: String, required: true },
    tutorGender: { type: String, required: true, default: 'Any' },
    location: { type: String, required: true },
    tuitionType: { type: String, required: true, default: 'Offline' },
    otherRequirements: { type: String },

    approved: { type: Boolean, required: true, default: false }, // don't appear in frontend
    confirmed: { type: Boolean, required: true, default: false }, // don't appear in frontend
    confirmedTeacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' }



}, { timestamps: true }))


module.exports.TuitionModel = TuitionModel