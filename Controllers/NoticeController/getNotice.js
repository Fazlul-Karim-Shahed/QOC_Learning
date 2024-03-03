


const { NoticeModel } = require('../../Models/NoticeModel')

const getNotice = async (req, res) => {

    let notice = await NoticeModel.find(req.body).populate(['curriculumId'])

    if (notice.length != 0) {

        res.status(200).send({ message: 'All notice', error: false, data: notice })
    }
    else {
        res.send({ message: 'No notice found', error: true })
    }

}

module.exports.getNotice = getNotice
