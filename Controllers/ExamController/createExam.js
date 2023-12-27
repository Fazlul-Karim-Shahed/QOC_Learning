const { ExamModel } = require("../../Models/ExamModel");
const { MCQModel } = require("../../Models/McqModel");
const { BroadQuestionModel } = require("../../Models/BroadQuestionModel");
const { cleanObject } = require("../cleanObject");
const { generateRandValue } = require("../generateRandValue");


const createExam = async (req, res) => {

    let query = {
        curriculumId: req.body.curriculumId,
        subjectId: req.body.subjectId
    }

    let mcqsId = []
    let broadQuestionsId = []

    for (let i in cleanObject(req.body)) {

        if (i === 'chapterId') {

            query = await { ...query, chapterId: cleanObject(req.body)[i] }
        }
        else if (i === 'moduleId') {
            query = await { ...query, moduleId: cleanObject(req.body)[i] }

        }

        else continue
    }


    if (req.body.numberOfMcq != 0) {

        let mcq = await MCQModel.find(query)

        if (mcq && mcq.length >= req.body.numberOfMcq) {


            for (let i = 0; i < req.body.numberOfMcq; i++) {

                let mcqId = await generateRandValue(mcq, mcqsId)
                mcqsId.push(mcqId)
            }

        }
        else {
            return res.send({ message: 'Not enough mcq found. Please add more.', error: true })
        }
    }


    if (req.body.numberOfBroadQuestion != 0) {

        let broadQuestion = await BroadQuestionModel.find(query)

        if (broadQuestion && broadQuestion.length >= req.body.numberOfBroadQuestion) {

            for (let i = 0; i < req.body.numberOfBroadQuestion; i++) {

                let broadQuestionId = await generateRandValue(broadQuestion, broadQuestionsId)
                broadQuestionsId.push(broadQuestionId)
            }

        }
        else {

            return res.send({ message: 'Not enough broad question found. Please add more.', error: true })

        }

    }


    let exam = await new ExamModel({

        ...query,
        exam: req.body.exam,
        mcqsId: mcqsId,
        broadQuestionsId: broadQuestionsId,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        negativeMarking: req.body.negativeMarking,
        perMcqMarks: req.body.perMcqMarks,
        totalMarks: req.body.totalMarks,
        participants: [],
    })

    exam.save().then(data => {
        return res.send({ message: 'Exam created successfully', error: false, data: data });
    }).catch(err => {
        return res.send({ message: 'Exam creation failed', error: true, data: err.message });
    })


}

module.exports.createExam = createExam