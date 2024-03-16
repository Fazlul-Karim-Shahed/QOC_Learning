
const { Schema, default: mongoose } = require("mongoose")
const { TuitionModel } = require("../../Models/TuitionModel")


const applyTuition = async (req, res) => {

    // console.log(tuition)


    let tuition = await TuitionModel.findOne({ _id: req.params.tuitionId })

    if (tuition.applicants.includes(new mongoose.Types.ObjectId(req.body._id))) {

        res.send({ message: 'You already applied this job', error: true })
        
    }
    else {

        TuitionModel.updateOne({ _id: req.params.tuitionId }, { $push: { applicants: new mongoose.Types.ObjectId(req.body._id) } }).then(data => {
            res.send({ message: 'Successfully applied the tuition', error: false, data: data })
        })
            .catch(err => {
                res.send({ message: 'Application failed', error: true, data: err.message })

            })
        
    }

    

}

module.exports.applyTuition = applyTuition
