const { CurriculumModel } = require('../../Models/CurriculumModel')

const getACurriculum = async (req, res) => {

    let curriculum = await CurriculumModel.findOne({_id: req.params.curriculumId})

    if (curriculum.length != 0) {
        res.status(200).send({ message: ' found', error: false, data: curriculum })
    }
    else {
        res.send({ message: 'Curriculum found found', error: true })
    }

}

module.exports.getACurriculum = getACurriculum
