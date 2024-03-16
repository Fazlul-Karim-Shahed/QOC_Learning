


const { NoticeModel } = require("../../Models/NoticeModel");


const createNotice = (req, res) => {

    let notice = new NoticeModel(req.body)

    notice.save().then(data => {
        res.send({ message: 'Notice created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'Notice creation failed', error: true, value: err.message });
    })

}

module.exports.createNotice = createNotice

