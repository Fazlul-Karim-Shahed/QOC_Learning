const { MCQModel } = require("../../Models/McqModel");
const { cleanObject } = require("../cleanObject");


const createMcq = (req, res) => {

    let mcq = new MCQModel(cleanObject(req.body))

    mcq.save().then(data => {
        res.send({ message: 'MCQ created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'MCQ creation failed', error: true, value: err.message });
    })

}

module.exports.createMcq = createMcq