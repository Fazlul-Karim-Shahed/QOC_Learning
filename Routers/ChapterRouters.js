
const { addChapter } = require('../Controllers/ChapterController/addChapter')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), addChapter)


module.exports = router
