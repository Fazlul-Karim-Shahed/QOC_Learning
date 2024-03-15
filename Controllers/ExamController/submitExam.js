

const { IncomingForm } = require('formidable')
const { ExamModel } = require('../../Models/ExamModel');
const { formDataToObj } = require('../formDataToObj');
const fs = require('fs');
const { cleanObject } = require('../cleanObject');

const submitExam = async (req, res) => {

    let examData = await ExamModel.findOne({ _id: req.params.examId })

    console.log()

    if (new Date() < new Date(examData.startTime) || new Date() > new Date(examData.endTime)) {
        return res.send({ message: 'Exam submission failed', error: true })
    }


    else {
        let form = new IncomingForm()
        form.keepExtensions = true

        form.parse(req, (err, fields, files) => {

            if (err) {

                return res.send({ message: 'Exam submission failed', error: true })
            }
            else {

                let participantsObj = cleanObject(formDataToObj(fields))


                if (files && Object.keys(files).length != 0) {

                    if (files['script'][0].size > 15 * 1024 * 1024) { // 15 mb
                        return res.send({ message: 'Size must me less than 15 mb', error: true })
                    }

                    fs.readFile(files['script'][0].filepath, (err, data) => {

                        participantsObj['script'] = {
                            data: data,
                            contentType: files['script'][0].mimetype,
                            name: files['script'][0].originalFilename,
                        }

                        ExamModel.updateOne({ _id: req.params.examId }, { $push: { participants: participantsObj } }).then(data => {

                            return res.send({ message: 'Exam submitted successfully', error: false, data: data })

                        }).catch(err => {

                            console.log(err)
                            return res.send({ message: 'Exam submission failed', error: true, data: err.message })

                        })

                    })

                }
                else {
                    ExamModel.updateOne({ _id: req.params.examId }, { $push: { participants: participantsObj } }).then(data => {

                        return res.send({ message: 'Exam submitted successfully', error: false, data: data })

                    }).catch(err => {

                        return res.send({ message: 'Exam submission failed', error: true, data: err.message })

                    })
                }

            }

        })
    }



}

module.exports.submitExam = submitExam