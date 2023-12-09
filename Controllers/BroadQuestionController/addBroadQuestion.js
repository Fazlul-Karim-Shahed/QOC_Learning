const { MCQModel } = require("../../Models/McqModel")


const addBroadQuestion = (req, res) => {

    let mcq = new MCQModel(req.body)

    mcq.save().then(data => {
        res.send({ message: 'Broad question created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'Broad question creation failed', error: true, value: err.message });
    })

}

module.exports.addBroadQuestion = addBroadQuestion