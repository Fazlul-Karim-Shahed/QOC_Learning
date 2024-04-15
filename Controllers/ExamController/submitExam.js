

const { IncomingForm } = require('formidable')
const { ExamModel } = require('../../Models/ExamModel');
const { formDataToObj } = require('../formDataToObj');
const fs = require('fs');
const { cleanObject } = require('../cleanObject');
const path = require('path');

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


                    // const prefix = new Date().getTime() * Math.random()
                    const prefix = ""
                    const tempPath = files['script'][0].filepath;
                    const destinationPath = path.join(process.cwd(), "uploads", prefix + files['script'][0].originalFilename);

                    fs.copyFile(tempPath, destinationPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
                        }

                        participantsObj['script'] = {
                            contentType: files['script'][0].mimetype,
                            name: prefix + files['script'][0].originalFilename,
                        }


                        ExamModel.updateOne({ _id: req.params.examId }, { $push: { participants: participantsObj } }).then(data => {

                            return res.send({ message: 'Exam submitted successfully', error: false, data: data })

                        }).catch(err => {

                            console.log(err)
                            return res.send({ message: 'Exam submission failed', error: true, data: err.message })

                        })

                    });

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