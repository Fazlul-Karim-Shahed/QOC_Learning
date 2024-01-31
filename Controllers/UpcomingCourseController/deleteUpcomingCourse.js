

const { UpcomingCourseModel } = require('../../Models/UpcomingCourseModel')

const deleteUpcomingCourse = async (req, res) => {

    UpcomingCourseModel.deleteOne({ _id: req.params.upcomingCourseId }).then(data => {
         res.send({ message: 'course deleted successfully', error: false, value: data })
    }).catch(err => {
         res.send({ message: 'course deletion failed', error: true, value: err.message })
     })


}

module.exports.deleteUpcomingCourse = deleteUpcomingCourse
