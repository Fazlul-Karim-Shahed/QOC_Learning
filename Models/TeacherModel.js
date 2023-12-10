const { model, Schema } = require('mongoose')

const TeacherModel = model('Teacher', Schema({

    username: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: {
        type: String,
        max: 1024,
        min: 6,
        required: true,

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
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    country: { type: String },
    bio: { type: String },
    description: { type: String },
    image: { data: Buffer, contentType: String, type: Object },
    isPremium: { type: Boolean, default: false, required: true },
    premiumEnd: { type: Date },

    




}, { timestamps: true }))


module.exports.TeacherModel = TeacherModel