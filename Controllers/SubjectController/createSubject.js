const fs = require('fs')
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const path = require('path')


const createSubject = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        // console.log(files)

        if (err) {

            res.send({ message: 'Subject upload failed', error: true })
        }
        else {

            console.log(fields)

            let subjectObj = {}

            for (let i in fields) {

                subjectObj[i] = fields[i][0]

            }

            // console.log(subjectObj)

            let subject = new SubjectModel(subjectObj)

            if (files && Object.keys(files).length !== 0) {

                // console.log('outlines', files['outlines[]'])
                // console.log('Materials', files['materials[]'])

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
                                    type: 'outlines'
                                })

                            });
                        })

                        arr.push(x)
                    }
                }

                if (files['materials[]'] && files['materials[]'].length > 0) {


                    for (let i in files['materials[]']) {

                        let p = new Promise(resolve => {

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
                                    type: 'materials'
                                })

                            });
                        })

                        arr.push(p)
                    }
                }


                Promise.all(arr).then(arr => {

                    let materials = arr.filter(data => data.type === 'materials')
                    let outlines = arr.filter(data => data.type === 'outlines')

                    subject['materials'] = materials.map(data => {

                        return {
                            // data: data.data,
                            contentType: data.contentType,
                            name: data.name
                        }
                    })

                    subject['outlines'] = outlines.map(data => {

                        return {
                            // data: data.data,
                            contentType: data.contentType,
                            name: data.name
                        }
                    })

                    // console.log('with file', subject)

                    subject.save().then(data => {

                        res.send({ message: 'Subject created successfully', error: false, value: data });
                    }).catch(err => {
                        res.send({ message: 'Subject upload failed', error: true, data: err.message })
                    })


                })

            }
            else {

                // console.log('without file', subject)

                subject.save().then(data => {

                    res.send({ message: 'Subject created successfully', error: false, value: data });

                }).catch(err => {
                    res.send({ message: 'Subject upload failed', error: true, data: err.message })
                })

            }

        }


    })


}


module.exports.createSubject = createSubject

