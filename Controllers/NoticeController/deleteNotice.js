

const { NoticeModel } = require('../../Models/NoticeModel')

const deleteNotice = async (req, res) => {

    NoticeModel.deleteOne({ _id: req.params.noticeId }).then(data => {
        res.send({ message: 'Notice deleted successfully', error: false, value: data })
    }).catch(err => {
        res.send({ message: 'Notice deletion failed', error: true, value: err.message })
    })


}

module.exports.deleteNotice = deleteNotice
