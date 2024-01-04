
const fs = require('fs')
const { AssignmentModel } = require('../../Models/AssignmentModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const createAssignment = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

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

                    fs.readFile(files['assignment'][0].filepath, (err, data) => {

                        resolve({
                            data: data,
                            contentType: files['assignment'][0].mimetype,
                            name: files['assignment'][0].originalFilename,
                        })

                    })
                })


                x.then(data => {

                    assignment['assignment'] = data

                    assignment.save().then(data => {

                        res.send({ message: 'Assignment created successfully', error: false, data: data });
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


module.exports.createAssignment = createAssignment

