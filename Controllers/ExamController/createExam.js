const { ExamModel } = require("../../Models/ExamModel");
const { MCQModel } = require("../../Models/McqModel");
const { BroadQuestionModel } = require("../../Models/BroadQuestionModel");
const { cleanObject } = require("../cleanObject");
const { generateRandValue } = require("../generateRandValue");
const { IncomingForm } = require("formidable")
const fs = require('fs');
const { formDataToObj } = require("../formDataToObj");


const createExam = async (req, res) => {

    let form = new IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {

        // console.log(fields)

        let examObj = cleanObject(formDataToObj(fields))
        // console.log(examObj)

        if (err) {
            return res.send({ message: 'Exam creation failed', error: true, data: err.message });
        }
        else {

            let query = {
                curriculumId: examObj.curriculumId,
                subjectId: examObj.subjectId
            }

            for (let i in cleanObject(examObj)) {

                if (i === 'chapterId') {

                    query = { ...query, chapterId: cleanObject(examObj)[i] }
                }
                else if (i === 'moduleId') {
                    query = { ...query, moduleId: cleanObject(examObj)[i] }

                }

                else continue

            }



            if (examObj.manualQuestion && files['attachment']) {

                if (files['attachment'][0].size <= 15 * 1024 * 1024) {

                    let x = new Promise(resolve => {

                        fs.readFile(files['attachment'][0].filepath, (err, data) => {

                            resolve({
                                data: data,
                                contentType: files['attachment'][0].mimetype,
                                name: files['attachment'][0].originalFilename,
                            })

                        })
                    })

                    x.then(data => {



                        let exam = new ExamModel({

                            ...query,
                            exam: examObj.exam,
                            startTime: new Date(examObj.startTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
                            endTime: new Date(examObj.endTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
                            totalMarks: examObj.totalMarks,
                            participants: [],
                            attachment: data,
                            manualQuestion: true,
                            description: examObj.description
                        })


                        exam.save().then(data => {
                            return res.send({ message: 'Exam created successfully', error: false, data: data });
                        }).catch(err => {
                            return res.send({ message: 'Exam creation failed', error: true, data: err.message });
                        })
                    })



                }
                else {
                    return res.send({ message: 'File size should be less than 15MB', error: true, data: null })
                }

            }
            else {
                let exam = new ExamModel({

                    ...query,
                    exam: examObj.exam,
                    mcqsId: examObj.mcqsId,
                    broadQuestionsId: examObj.broadQuestionsId,
                    startTime: new Date(examObj.startTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
                    endTime: new Date(examObj.endTime).toLocaleString("en-US", { timeZone: "Asia/Dhaka" }),
                    negativeMarking: examObj.negativeMarking,
                    perMcqMarks: examObj.perMcqMarks,
                    totalMarks: examObj.totalMarks,
                    participants: [],
                })

                exam.save().then(data => {
                    return res.send({ message: 'Exam created successfully', error: false, data: data });
                }).catch(err => {
                    return res.send({ message: 'Exam creation failed', error: true, data: err.message });
                })



            }




        }

    })











}

module.exports.createExam = createExam