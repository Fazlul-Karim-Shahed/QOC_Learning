
const fs = require('fs')
const { AssignmentModel } = require('../../Models/AssignmentModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const { StudentModel } = require('../../Models/StudentModel')
const path = require('path')


const createAssignment = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    let student = await StudentModel.findOne({ _id: req.user._id })

    if (student.assignment.count < 11) {

        form.parse(req, (err, fields, files) => {

            if (err) {

                res.send({ message: 'Assignment upload failed', error: true })
            }
            else {

                let assignmentObj = {}

                for (let i in fields) {

                    assignmentObj[i] = fields[i][0]

                }

                console.log('Fields: ', assignmentObj)

                let assignment = new AssignmentModel(assignmentObj)

                // console.log(Object.keys(files).length)

                if (files && Object.keys(files).length > 0) {


                    let x = new Promise(resolve => {

                        const prefix = new Date().getTime() * Math.random()
                        const tempPath = files['assignment'][0].filepath;
                        const destinationPath = path.join(process.cwd(), "uploads", prefix + files['assignment'][0].originalFilename);

                        fs.copyFile(tempPath, destinationPath, (err) => {
                            if (err) {
                                console.error(err);
                                return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                            }
                            resolve({
                                contentType: files['assignment'][0].mimetype,
                                name: prefix + files['assignment'][0].originalFilename,
                            })

                        });
                    })


                    x.then(data => {

                        assignment['assignment'] = data

                        assignment.save().then(data => {

                            student['assignment'] = {
                                ...student['assignment'],
                                count: student['assignment'].count + 1
                            }

                            student.save().then(data => {
                                res.send({ message: 'Assignment created successfully', error: false, data: data });
                            }).catch(err => {
                                res.send({ message: 'Assignment creation successfully. ' + err.message, error: true, });
                            })


                        }).catch(err => {
                            res.send({ message: 'Assignment creation failed', error: true, data: err.message });
                        })


                    })



                }
                else {

                    res.send({ message: 'Assignment creation failed. File must needed', error: true })

                }

            }


        })
    }
    else {
        res.send({ message: 'Assignment creation failed. Maximum 11 assignments allowed. Please buy premium', error: true })
    }




}


module.exports.createAssignment = createAssignment

