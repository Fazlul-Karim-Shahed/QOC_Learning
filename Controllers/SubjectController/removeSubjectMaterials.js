
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')


const removeSubjectMaterials = async (req, res) => {

    let subject = await SubjectModel.findOne({ _id: req.params.subjectId })

    subject['materials'].splice(req.params.position, 1)

    subject.save().then(data => {

        res.send({ message: 'material removed successfully', error: false, data: data });
    }).catch(err => {

        res.send({ message: 'material removal failed', error: true, data: err });
    })



}


module.exports.removeSubjectMaterials = removeSubjectMaterials

