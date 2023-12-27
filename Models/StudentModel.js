const { model, Schema } = require('mongoose')

const StudentModel = model('Student', Schema({

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
        default: 'student',
        required: true,
    },

    country: { type: String, default: 'Bangladesh', required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: 'Curriculum' },
    

}, { timestamps: true }))


module.exports.StudentModel = StudentModel