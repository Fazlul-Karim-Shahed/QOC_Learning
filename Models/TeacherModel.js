const { model, Schema } = require('mongoose')

const TeacherModel = model('Teacher', new Schema({

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
        required: true,
        minlength: [6, 'Minimum length should be 6'],
        maxlength: [1024, 'Maximum length should be 1024']

    },
    role: {
        type: String,
        default: 'teacher',
        required: true,
    },
    degree: { type: String },
    review: { type: Number, default: 0, required: true },
    grading: { type: Number },
    useQocExam: { type: Number, default: 0, required: true },
    checkQocExam: { type: Number, default: 0, required: true },
    contactAgree: { type: Boolean, default: false, required: true },
    institution: { type: String },
    gender: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    bio: { type: String },
    description: { type: String },
    image: { data: Buffer, contentType: String, type: Object },
    batch: {
        isPremium: { type: Boolean, required: true, default: false },
        startTime: { type: Date, default: new Date().toLocaleString(), required: true },
        endTime: { type: Date, default: new Date().toLocaleString(), required: true },
        transaction: { type: String },

        // endTime: { type: Date, default: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(), required: true },
    },

    




}, { timestamps: true }))


module.exports.TeacherModel = TeacherModel