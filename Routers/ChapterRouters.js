
const { createChapter } = require('../Controllers/ChapterController/createChapter')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createChapter)


module.exports = router
