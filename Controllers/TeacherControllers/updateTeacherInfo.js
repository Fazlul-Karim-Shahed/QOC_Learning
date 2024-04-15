
const fs = require('fs')
const { TeacherModel } = require('../../Models/TeacherModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { formDataToObj } = require('../formDataToObj')
const { cleanObject } = require('../cleanObject')
const path = require('path')


const updateTeacherInfo = async (req, res) => {

    // console.log(req.params.teacherId)

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            return res.send({ message: 'Assignment upload failed', error: true })
        }
        else {

            let teacherInfoObj

            if (fields) {

                teacherInfoObj = cleanObject(formDataToObj(fields))
            }

            if (files && Object.keys(files).length > 0) {

                if (files['image'][0].size > 1024 * 1024) { // 1mb
                    return res.send({ message: 'Pictute size must me less than 1 mb', error: true })
                }
                else {
                    let x = new Promise(resolve => {

                        // const prefix = new Date().getTime() * Math.random()
                        const prefix = ""
                        const tempPath = files['image'][0].filepath;
                        const destinationPath = path.join(process.cwd(), "uploads", prefix + files['image'][0].originalFilename);

                        fs.copyFile(tempPath, destinationPath, (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                            }
                            resolve({
                                contentType: files['image'][0].mimetype,
                                name: prefix + files['image'][0].originalFilename,
                            })

                        });
                    })


                    x.then(data => {

                        teacherInfoObj['image'] = data

                        TeacherModel.updateOne({ _id: req.params.teacherId }, teacherInfoObj).then(data => {

                            return res.send({ message: 'Teacher updated successfully', error: false, data: data })

                        }).catch(err => {

                            return res.send({ message: 'Teacher update failed', error: true, data: err.message })
                        })

                    })
                }



            }
            else {

                TeacherModel.updateOne({ _id: req.params.teacherId }, teacherInfoObj).then(data => {

                    return res.send({ message: 'Teacher updated successfully', error: false, data: data })

                }).catch(err => {

                    return res.send({ message: 'Teacher update failed', error: true, data: err.message })
                })

            }

        }


    })


}


module.exports.updateTeacherInfo = updateTeacherInfo

