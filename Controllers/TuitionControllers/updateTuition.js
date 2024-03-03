


const { TuitionModel } = require('../../Models/TuitionModel')



const updateTuition = async (req, res) => {

    TuitionModel.findOneAndUpdate({ _id: req.params.tuitionId }, req.body).then(data => {
        res.send({ message: 'Tuition updated successfully', error: false, value: data });
    })
        .catch(err => {
            res.send({ message: 'Tuition update failed', error: true, value: err.message });
        })
    
}

module.exports.updateTuition = updateTuition

