const { model, Schema } = require('mongoose')

const SubjectModel = model('Subject', Schema({

    subject: { type: String, required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },
    paid: { type: Boolean, required: true, default: false },
    materials: [{ data: Buffer, contentType: String, type: Object, name: String }],
    outlines: [{ data: Buffer, contentType: String, type: Object }],

}, { timestamps: true }))


module.exports.SubjectModel = SubjectModel