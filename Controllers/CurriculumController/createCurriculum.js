const fs = require('fs')
const { CurriculumModel } = require('../../Models/CurriculumModel')
const _ = require('lodash')
const { formidable } = require('formidable')



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

                            if (files['outlines[]'][i].size > 15 * 1024 * 1024) { // 15 mb
                                return res.send({ message: 'Size must me less than 15 mb', error: true })
                            }

                            let x = new Promise(resolve => {

                                fs.readFile(files['outlines[]'][i].filepath, (err, data) => {

                                    resolve({
                                        data: data,
                                        contentType: files['outlines[]'][i].mimetype,
                                        name: files['outlines[]'][i].originalFilename,
                                    })

                                })
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

