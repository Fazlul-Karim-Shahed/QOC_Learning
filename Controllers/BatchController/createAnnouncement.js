
const fs = require('fs')
const { BatchModel } = require('../../Models/BatchModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { formDataToObj } = require('../formDataToObj')


const createAnnouncement = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    let batch = await BatchModel.findOne({ _id: req.params.batchId })

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Announcement upload failed', error: true })
        }
        else {

            let announcementObj = formDataToObj(fields)

            if (files && Object.keys(files).length !== 0) {

                let arr = []

                if (files['materials[]'] && files['materials[]'].length > 0) {

                    for (let i in files['materials[]']) {

                        if (files['materials[]'][i].size > 15 * 1024 * 1024) { // 15 mb
                            return res.send({ message: 'Size must me less than 15 mb', error: true })
                        }

                        let x = new Promise(resolve => {

                            fs.readFile(files['materials[]'][i].filepath, (err, data) => {

                                resolve({
                                    data: data,
                                    contentType: files['materials[]'][i].mimetype,
                                    name: files['materials[]'][i].originalFilename,
                                })

                            })
                        })

                        arr.push(x)
                    }
                }


                Promise.all(arr).then(arr => {


                    announcementObj['materials'] = [...arr]
                    batch['announcements'] = [...batch.announcements, announcementObj]

                    batch.save().then(data => {

                        res.send({ message: 'announcement created successfully', error: false, value: data });
                    }).catch(err => {

                        res.send({ message: 'announcement creation failed', error: true, value: err.message });
                    })



                })

            }
            else {


                batch['announcements'] = [...batch.announcements, announcementObj]

                batch.save().then(data => {

                    res.send({ message: 'Announcement created successfully', error: false, value: data });

                }).catch(err => {

                    res.send({ message: 'Announcement creation failed', error: true, value: err.message });
                })

            }

        }


    })


}


module.exports.createAnnouncement = createAnnouncement

