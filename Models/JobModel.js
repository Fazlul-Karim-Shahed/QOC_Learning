const { model, Schema } = require('mongoose')

const JobModel = model('Job', Schema({

    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    applicants: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
    jobNumber: { type: Number, required: true }, // don't appear in frontend
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
    confirmedTeacherId: { type: Schema.Types.ObjectId }



}, { timestamps: true }))


module.exports.JobModel = JobModel