const { IncomingForm } = require("formidable");
const { BroadQuestionModel } = require("../../Models/BroadQuestionModel");
const { cleanObject } = require("../cleanObject");
const { formDataToObj } = require('../formDataToObj')
const path = require('path')
const fs = require('fs')


const createBroadQuestion = (req, res) => {

    // let broadQuestion = new BroadQuestionModel(cleanObject(req.body))

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'Broad question upload failed', error: true })
        }

        let broadQuestionObj = cleanObject(formDataToObj(fields))
        let broadQuestion = new BroadQuestionModel({ ...broadQuestionObj })



        if (files && Object.keys(files).length !== 0) {

            let arr = []

            if (files['questionAttachment'] && files['questionAttachment'].length > 0) {

                let q = new Promise(resolve => {
                    const prefix = new Date().getTime() * Math.random()
                    const tempPath = files['questionAttachment'][0].filepath
                    const destinationPath = path.join(process.cwd(), "uploads", prefix + files['questionAttachment'][0].originalFilename)

                    fs.copyFile(tempPath, destinationPath, (err) => {
                        if (err) {
                            console.error(err)
                            return res.status(500).json({ error: 'Failed to move the file to destination folder.' })
                        }
                        resolve({
                            contentType: files['questionAttachment'][0].mimetype,
                            name: prefix + files['questionAttachment'][0].originalFilename,
                            type: 'questionAttachment'
                        })
                    })
                })

                arr.push(q)
            }

            if (files['answerAttachment'] && files['answerAttachment'].length > 0) {
                let a = new Promise(resolve => {
                    const prefix = new Date().getTime() * Math.random()
                    const tempPath = files['answerAttachment'][0].filepath
                    const destinationPath = path.join(process.cwd(), "uploads", prefix + files['answerAttachment'][0].originalFilename)

                    fs.copyFile(tempPath, destinationPath, (err) => {
                        if (err) {
                            console.error(err)
                            return res.status(500).json({ error: 'Failed to move the file to destination folder.' })
                        }
                        resolve({
                            contentType: files['answerAttachment'][0].mimetype,
                            name: prefix + files['answerAttachment'][0].originalFilename,
                            type: 'answerAttachment'
                        })
                    })
                })

                arr.push(a)
            }

            Promise.all(arr).then(data => {
                broadQuestion['answerAttachment'] = data.filter(attachment => attachment.type === 'answerAttachment')[0]
                broadQuestion['questionAttachment'] = data.filter(attachment => attachment.type === 'questionAttachment')[0]

                res.send({ message: 'Broad question created successfully', error: false, value: data });
                broadQuestion.save().then(data => {
                }
                ).catch(err => {
                    res.send({ message: 'Broad question creation failed', error: true, value: err.message });
                })
            })


        }
        else {

            broadQuestion.save().then(data => {
                res.send({ message: 'Broad question created successfully', error: false, value: data });
            }
            ).catch(err => {
                res.send({ message: 'Broad question creation failed', error: true, value: err.message });
            })

        }

    })


}

module.exports.createBroadQuestion = createBroadQuestion