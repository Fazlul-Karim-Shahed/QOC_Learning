
const { createNotice } = require('../Controllers/NoticeController/createNotice')
const { deleteNotice } = require('../Controllers/NoticeController/deleteNotice')
const { getNotice } = require('../Controllers/NoticeController/getNotice')
const { roleCheck } = require('../Middlewares/roleCheck')


const router = require('express').Router()

router.post('/', roleCheck('admin'), createNotice)
router.delete('/:noticeId', roleCheck('admin'), deleteNotice)
router.post('/get', getNotice)


module.exports = router