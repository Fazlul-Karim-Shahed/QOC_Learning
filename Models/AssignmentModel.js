

const { model, Schema } = require('mongoose')

const AssignmentModel = model('Assignment', new Schema({

    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    title: { type: String, required: true },
    assignment: { data: Buffer, contentType: String, type: Object, name: String },
    answer: [{ data: Buffer, contentType: String, type: Object, name: String }]

}, { timestamps: true }))


module.exports.AssignmentModel = AssignmentModel