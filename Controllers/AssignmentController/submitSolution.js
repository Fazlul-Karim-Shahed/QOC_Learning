
const fs = require('fs')
const { AssignmentModel } = require('../../Models/AssignmentModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')
const path = require('path')


const submitSolution = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Assignment upload failed', error: true })
        }
        else {

            if (files && Object.keys(files).length > 0) {

                let x = new Promise(resolve => {

                    const prefix = new Date().getTime() * Math.random()
                    const tempPath = files['answer'][0].filepath;
                    const destinationPath = path.join(process.cwd(), "uploads", prefix + files['answer'][0].originalFilename);

                    fs.copyFile(tempPath, destinationPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                        }
                        resolve({
                            contentType: files['answer'][0].mimetype,
                            name: prefix + files['answer'][0].originalFilename,
                        })

                    });
                })


                x.then(data => {

                    AssignmentModel.updateOne({ _id: req.params.assignmentId }, { $push: { answer: data } }).then(data => {

                        res.send({ message: 'Answer submitted successfully', error: false, data: data })

                    }).catch(err => {

                        res.send({ message: 'Answer submission failed', error: true, data: err.message })
                    })

                })



            }
            else {

                res.send({ message: 'Answer submission failed. File must needed', error: true })

            }

        }


    })


}


module.exports.submitSolution = submitSolution

