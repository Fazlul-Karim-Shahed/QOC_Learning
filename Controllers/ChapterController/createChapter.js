const fs = require('fs')
const { ChapterModel } = require('../../Models/ChapterModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const path = require('path')


const createChapter = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Chapter upload failed', error: true })
        }
        else {

            let chapterObj = {}

            for (let i in fields) {

                chapterObj[i] = fields[i][0]

            }

            let chapter = new ChapterModel(chapterObj)

            if (files && Object.keys(files).length !== 0) {

                let arr = []

                if (files['materials[]'] && files['materials[]'].length > 0) {

                    for (let i in files['materials[]']) {

                        let x = new Promise(resolve => {

                            // const prefix = new Date().getTime() * Math.random()
                            const prefix = ""
                            const tempPath = files['materials[]'][i].filepath;
                            const destinationPath = path.join(process.cwd(), "uploads", prefix + files['materials[]'][i].originalFilename);

                            fs.copyFile(tempPath, destinationPath, (err) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                                }
                                resolve({
                                    contentType: files['materials[]'][i].mimetype,
                                    name: prefix + files['materials[]'][i].originalFilename,
                                })

                            });
                        })

                        arr.push(x)
                    }
                }


                Promise.all(arr).then(arr => {


                    chapter['materials'] = [...arr]

                    chapter.save().then(data => {

                        res.send({ message: 'Chapter created successfully', error: false, value: data });
                    }).catch(err => {

                        res.send({ message: 'Chapter creation failed', error: true, value: err.message });
                    })



                })

            }
            else {

                chapter.save().then(data => {

                    res.send({ message: 'chapter created successfully', error: false, value: data });

                }).catch(err => {

                    res.send({ message: 'Chapter creation failed', error: true, value: err.message });
                })

            }

        }


    })


}


module.exports.createChapter = createChapter

