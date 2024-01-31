const { model, Schema } = require('mongoose')

const UpcomingCourseModel = model('UpcomingCourse', new Schema({
    title: { type: String, required: true },
    startDate: { type: Date },
    description: { type: String, required: true },
    curriculumId: { type: Schema.Types.ObjectId, ref: "Curriculum", required: true },

}, { timestamps: true }))


module.exports.UpcomingCourseModel = UpcomingCourseModel