const { default: mongoose } = require('mongoose')
const { CurriculumModel } = require('../../Models/CurriculumModel')

const getACurriculum = async (req, res) => {

    CurriculumModel.findOne({ _id: new mongoose.Types.ObjectId(req.params.curriculumId) }).then(data => {
        if (!data) {
            res.status(404).send({ message: 'Curriculum not found', error: true,  data: err.message })
        }
        res.status(200).send({ message: 'Curriculum found', error: false, data: data })
    })
    .catch(err => {
        res.send({ message: 'Curriculum not found', error: true,  data: err.message })
    })

}

module.exports.getACurriculum = getACurriculum
