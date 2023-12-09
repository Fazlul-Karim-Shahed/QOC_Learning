const { MCQModel } = require("../../Models/McqModel")


const addMcq = (req, res) => {

    // let obj = _.pick(req.body, ['chapterId', 'subjectId', 'curriculumId', 'moduleId', 'question', 'options', 'answer', 'hints', 'explanation', 'difficulty', 'tags'])

    let mcq = new MCQModel(req.body)

    mcq.save().then(data => {
        res.send({ message: 'MCQ created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'MCQ creation failed', error: true, value: err.message });
    })

}

module.exports.addMcq = addMcq