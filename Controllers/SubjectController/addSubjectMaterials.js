const fs = require('fs')
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const path = require('path')


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
