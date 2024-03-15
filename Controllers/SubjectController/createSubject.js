const fs = require('fs')
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


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

                        if (files['outlines[]'][i].size > 15 * 1024 * 1024) { // 15 mb
                            return res.send({ message: 'Size must me less than 15 mb', error: true })
                        }

                        let x = new Promise(resolve => {

                            fs.readFile(files['outlines[]'][i].filepath, (err, data) => {

                                resolve({
                                    data: data,
                                    contentType: files['outlines[]'][i].mimetype,
                                    name: files['outlines[]'][i].originalFilename,
                                    type: 'outlines'
                                })

                            })
                        })

                        arr.push(x)
                    }
                }

                if (files['materials[]'] && files['materials[]'].length > 0) {


                    for (let i in files['materials[]']) {

                        if (files['materials[]'][i].size > 15 * 1024 * 1024) { // 15 mb
                            return res.send({ message: 'Size must me less than 15 mb', error: true })
                        }

                        let p = new Promise(resolve => {

                            fs.readFile(files['materials[]'][i].filepath, (err, data) => {

                                resolve({
                                    data: data,
                                    contentType: files['materials[]'][i].mimetype,
                                    name: files['materials[]'][i].originalFilename,
                                    type: 'materials'
                                })

                            })
                        })

                        arr.push(p)
                    }
                }


                Promise.all(arr).then(arr => {

                    let materials = arr.filter(data => data.type === 'materials')
                    let outlines = arr.filter(data => data.type === 'outlines')

                    subject['materials'] = materials.map(data => {

                        return {
                            data: data.data,
                            contentType: data.contentType,
                            name: data.name
                        }
                    })

                    subject['outlines'] = outlines.map(data => {

                        return {
                            data: data.data,
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
                    res.send({ message: 'Subject upload failed', error: true , data: err.message})
                })

            }

        }


    })


}


module.exports.createSubject = createSubject

