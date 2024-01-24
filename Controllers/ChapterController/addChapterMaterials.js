const fs = require('fs')
const { ChapterModel } = require('../../Models/ChapterModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const addChapterMaterials = async (req, res) => {

    let chapter = await ChapterModel.findOne({ _id: req.params.chapterId })

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {


        if (err) {

            res.send({ message: 'chapter upload failed', error: true })
        }
        else {

            if (files && Object.keys(files).length !== 0) {

                let arr = []

                if (files['materials[]'] && files['materials[]'].length > 0) {

                    for (let i in files['materials[]']) {

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

                    chapter['materials'] = [...chapter.materials, ...arr]

                    chapter.save().then(data => {

                        res.send({ message: 'Chapter added successfully', error: false, data: data });
                    })


                }).catch(err => {

                    res.send({ message: 'Chapter added failed', error: true, data: err })
                })

            }
            else {

                res.send({ message: 'No file uploaded', error: true })

            }

        }


    })


}


module.exports.addChapterMaterials = addChapterMaterials
