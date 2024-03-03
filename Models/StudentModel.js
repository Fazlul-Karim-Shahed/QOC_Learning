const { model, Schema } = require('mongoose')

const StudentModel = model('Student', new Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    mobile: {
        type: String,
        required: true,
        minlength: [11, 'Minimum length should be 11'],
        maxlength: [13, 'Maximum length should be 13']
    },
    password: {
        type: String,
        max: 1024,
        min: 6,
        required: true,

    },
    role: {
        type: String,
        default: 'student',
        required: true,
    },

    country: { type: String, default: 'Bangladesh', required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum' },
    assignment: {
        isPremium: { type: Boolean, required: true, default: false },
        startTime: { type: Date, default: new Date().toLocaleString(), required: true },
        endTime: { type: Date, default: new Date().toLocaleString(), required: true },
        transaction: { type: String },
        count: {type: Number, default: 0, required: true}
    },

    course: {
        isPremium: { type: Boolean, required: true, default: false },
        startTime: { type: Date, default: new Date().toLocaleString(), required: true },
        endTime: { type: Date, default: new Date().toLocaleString(), required: true },
        transaction: { type: String },
    },

}, { timestamps: true }))


module.exports.StudentModel = StudentModel