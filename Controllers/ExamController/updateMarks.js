
const { ExamModel } = require('../../Models/ExamModel');

const updateMarks = async (req, res) => {

    // console.log(req)

    ExamModel.updateOne(
        {
            _id: req.params.examId,
            'participants.studentId': req.params.studentId 
        },
        { $set: { "participants.$.broadQuestionMarks": req.body.broadQuestionMarks } }
    ).then(data => {
            
            return res.send({ message: 'Marks updated successfully', error: false, data: data })

    }).catch(err => {
            
            return res.send({ message: 'Marks update failed', error: true, data: err.message })

    })

}

module.exports.updateMarks = updateMarks
