const { TuitionModel } = require("../../Models/TuitionModel")



const deleteTuition = async (req, res) => {

    let tuition = await TuitionModel.deleteOne({ _id: req.params.tuitionId })

    if (tuition) {

        res.status(200).send({ message: 'Tuition Deleted', error: false, data: tuition })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }



}

module.exports.deleteTuition = deleteTuition
