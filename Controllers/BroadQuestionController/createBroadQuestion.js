const { BroadQuestionModel } = require("../../Models/BroadQuestionModel");
const { cleanObject } = require("../cleanObject");


const createBroadQuestion = (req, res) => {

    let broadQuestion = new BroadQuestionModel(cleanObject(req.body))

    broadQuestion.save().then(data => {
        res.send({ message: 'Broad question created successfully', error: false, value: data });
    }
    ).catch(err => {
        res.send({ message: 'Broad question creation failed', error: true, value: err.message });
    })

}

module.exports.createBroadQuestion = createBroadQuestion