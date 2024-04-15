const fs = require('fs')
const { CurriculumModel } = require('../../Models/CurriculumModel')
const _ = require('lodash')
const { formidable } = require('formidable')
const path = require('path')



const createCurriculum = async (req, res, next) => {

    try {
        let form = formidable({ maxFileSize: 5000 * 1024 * 1024 })
        form.keepExtensions = true

        form.parse(req, (err, fields, files) => {

            // console.log("Fields: ", fields)
            // console.log("Files: ", files)
            // console.log("Files: ", files['outlines[]'])

            if (err) {

                console.log(err)

                res.send({ message: 'Curriculum upload failed', error: true, data: err })
            }
            else {

                let curriculumObj = {}

                for (let i in fields) {

                    curriculumObj[i] = fields[i][0]

                }

                // console.log(curriculumObj)

                let curriculum = new CurriculumModel(curriculumObj)

                if (files && Object.keys(files).length !== 0) {

                    let arr = []

                    if (files['outlines[]'] && files['outlines[]'].length > 0) {

                        for (let i in files['outlines[]']) {

                            let x = new Promise(resolve => {

                                // const prefix = new Date().getTime() * Math.random()
                                const prefix = ""
                                const tempPath = files['outlines[]'][i].filepath;
                                const destinationPath = path.join(process.cwd(), "uploads", prefix + files['outlines[]'][i].originalFilename);

                                fs.copyFile(tempPath, destinationPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                                    }
                                    resolve({
                                        contentType: files['outlines[]'][i].mimetype,
                                        name: prefix + files['outlines[]'][i].originalFilename,
                                    })

                                });
                            })

                            arr.push(x)
                        }
                    }

                    Promise.all(arr).then(arr => {

                        curriculum['outlines'] = [...arr]

                        curriculum.save().then(data => {

                            res.send({ message: 'curriculum created successfully', error: false, data: data });

                        }).catch(err => {
                            res.send({ message: 'curriculum upload failed', error: true })
                        })


                    })

                }
                else {

                    curriculum.save().then(data => {

                        res.send({ message: 'curriculum created successfully', error: false, data: data });

                    }).catch(err => {
                        res.send({ message: 'curriculum upload failed', error: true })
                    })

                }

            }


        })

    }
    catch (err) {
        next(err)
    }



}


module.exports.createCurriculum = createCurriculum

