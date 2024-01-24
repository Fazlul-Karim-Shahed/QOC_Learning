
const { model, Schema } = require('mongoose')

const ResourceModel = model('Resource', new Schema({

    subjectId: { type: Schema.Types.ObjectId, ref: "Subject", },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },

    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },

    title: { type: String, required: true },
    description: { type: String },
    attachment: { data: Buffer, contentType: String, type: Object, name: String, required: true }

}, { timestamps: true }))


module.exports.ResourceModel = ResourceModel
