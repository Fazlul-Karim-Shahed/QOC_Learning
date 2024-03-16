
const { addChapterMaterials } = require('../Controllers/ChapterController/addChapterMaterials')
const { createChapter } = require('../Controllers/ChapterController/createChapter')
const { deleteChapter } = require('../Controllers/ChapterController/deleteChapter')
const { getAChapters } = require('../Controllers/ChapterController/getAChapter')
const { getChapters } = require('../Controllers/ChapterController/getChapters')
const { removeChapterMaterials } = require('../Controllers/ChapterController/removeChapterMaterials')
const { roleCheck } = require('../Middlewares/roleCheck')

const router = require('express').Router()

router.post('/', roleCheck('admin'), createChapter)
router.get('/:subjectId', getChapters)

router.get('/get-chapter/:chapterId', getAChapters)
router.delete('/:chapterId',roleCheck('admin'),  deleteChapter)

router.put('/add-material/:chapterId', roleCheck('admin'), addChapterMaterials)
router.put('/remove-material/:chapterId/:position', roleCheck('admin'), removeChapterMaterials)


module.exports = router
