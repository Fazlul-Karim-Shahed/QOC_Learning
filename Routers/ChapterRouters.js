
const { createChapter } = require('../Controllers/ChapterController/createChapter')
const { getChapters } = require('../Controllers/ChapterController/getChapters')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createChapter)
router.get('/:subjectId', getChapters)


module.exports = router
