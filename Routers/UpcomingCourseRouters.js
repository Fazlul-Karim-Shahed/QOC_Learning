
const { createUpcomingCourse } = require('../Controllers/UpcomingCourseController/createUpcomingCourse')
const { deleteUpcomingCourse } = require('../Controllers/UpcomingCourseController/deleteUpcomingCourse')
const { getUpcomingCourse } = require('../Controllers/UpcomingCourseController/getUpcomingCourse')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createUpcomingCourse)
router.delete('/:upcomingCourseId', roleCheck('admin'), deleteUpcomingCourse)
router.get('/', getUpcomingCourse)


module.exports = router