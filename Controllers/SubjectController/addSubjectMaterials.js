const fs = require('fs')
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const addSubjectMaterials = async (req, res) => {

    let subject = await SubjectModel.findOne({ _id: req.params.subjectId })

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {


        if (err) {

            res.send({ message: 'subject upload failed', error: true })
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

                    subject['materials'] = [...subject.materials, ...arr]

                    subject.save().then(data => {

                        res.send({ message: 'Outline added successfully', error: false, data: data });
                    })


                }).catch(err => {

                    res.send({ message: 'Outline added failed', error: true, data: err })
                })

            }
            else {

                res.send({ message: 'No file uploaded', error: true })

            }

        }


    })


}


module.exports.addSubjectMaterials = addSubjectMaterials
