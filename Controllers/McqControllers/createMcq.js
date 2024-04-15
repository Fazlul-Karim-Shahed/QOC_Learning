const { MCQModel } = require("../../Models/McqModel");
const { cleanObject } = require("../cleanObject");
const { formDataToObj } = require('../formDataToObj')
const path = require('path')
const fs = require('fs')
const { IncomingForm } = require("formidable");


const createMcq = (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        if (err) {

            res.send({ message: 'MCQ upload failed', error: true })
        }

        let mcqObj = cleanObject(formDataToObj(fields))

        mcqObj['options'] = [
            { option: 'a', value: mcqObj.a },
            { option: 'b', value: mcqObj.b },
        ]

        if (mcqObj.c) { mcqObj['options'].push({ option: 'c', value: mcqObj.c }) }
        if (mcqObj.d) { mcqObj['options'].push({ option: 'd', value: mcqObj.d }) }
        mcqObj['answer'] = mcqObj['answer'].toLowerCase()

        console.log(mcqObj)


        let mcq = new MCQModel({
            question: mcqObj.question,
            options: mcqObj.options,
            answer: mcqObj.answer,
            hints: mcqObj.hints,
            explanation: mcqObj.explanation,
            difficulty: mcqObj.difficulty,
            chapterId: mcqObj.chapterId,
            subjectId: mcqObj.subjectId,
            curriculumId: mcqObj.curriculumId,
            moduleId: mcqObj.moduleId
        })



        if (files && Object.keys(files).length !== 0) {

            let arr = []

            if (files['questionAttachment'] && files['questionAttachment'].length > 0) {

                let q = new Promise(resolve => {
                    // const prefix = new Date().getTime() * Math.random()
                    const prefix = ""
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
                    // const prefix = new Date().getTime() * Math.random()
                    const prefix = ""
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
                mcq['answerAttachment'] = data.filter(attachment => attachment.type === 'answerAttachment')[0]
                mcq['questionAttachment'] = data.filter(attachment => attachment.type === 'questionAttachment')[0]

                res.send({ message: 'MCQ created successfully', error: false, value: data });
                mcq.save().then(data => {
                }
                ).catch(err => {
                    res.send({ message: 'MCQ creation failed', error: true, value: err.message });
                })
            })


        }
        else {

            mcq.save().then(data => {
                res.send({ message: 'MCQ created successfully', error: false, value: data });
            }
            ).catch(err => {
                res.send({ message: 'MCQ creation failed', error: true, value: err.message });
            })

        }

    })

}

module.exports.createMcq = createMcq