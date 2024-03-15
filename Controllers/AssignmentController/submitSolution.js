
const fs = require('fs')
const { AssignmentModel } = require('../../Models/AssignmentModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const submitSolution = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Assignment upload failed', error: true })
        }
        else {

            // console.log(files)

            if (files && Object.keys(files).length > 0) {

                if (files['answer'][0].size > 15 * 1024 * 1024) { // 15 mb
                    return res.send({ message: 'Size must me less than 15 mb', error: true })
                }

                let x = new Promise(resolve => {

                    fs.readFile(files['answer'][0].filepath, (err, data) => {

                        resolve({
                            data: data,
                            contentType: files['answer'][0].mimetype,
                            name: files['answer'][0].originalFilename,
                        })

                    })
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

