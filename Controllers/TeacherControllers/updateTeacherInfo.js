
const fs = require('fs')
const { TeacherModel } = require('../../Models/TeacherModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { formDataToObj } = require('../formDataToObj')
const { cleanObject } = require('../cleanObject')


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

                let x = new Promise(resolve => {

                    fs.readFile(files['image'][0].filepath, (err, data) => {

                        resolve({
                            data: data,
                            contentType: files['image'][0].mimetype,
                            name: files['image'][0].originalFilename,
                        })

                    })
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

