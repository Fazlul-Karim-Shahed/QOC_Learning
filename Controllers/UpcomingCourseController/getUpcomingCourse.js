

const { UpcomingCourseModel } = require('../../Models/UpcomingCourseModel')

const getUpcomingCourse = async (req, res) => {

    let upcomingCourse = await UpcomingCourseModel.find().populate(['curriculumId'])

    if (upcomingCourse.length != 0) {

        res.status(200).send({ message: 'All upcoming course', error: false, data: upcomingCourse })
    }
    else {
        res.send({ message: 'No upcoming course found', error: true })
    }

}

module.exports.getUpcomingCourse = getUpcomingCourse
