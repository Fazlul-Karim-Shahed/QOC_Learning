

const { UpcomingCourseModel } = require("../../Models/UpcomingCourseModel");
const { cleanObject } = require("../cleanObject");


const createUpcomingCourse = (req, res) => {


    let course = new UpcomingCourseModel(cleanObject(req.body))

    course.save().then(data => {
        res.send({ message: 'course created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'course creation failed', error: true, value: err.message });
    })

}

module.exports.createUpcomingCourse = createUpcomingCourse