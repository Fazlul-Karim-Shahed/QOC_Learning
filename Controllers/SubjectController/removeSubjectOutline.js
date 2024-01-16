const fs = require('fs')
const { SubjectModel } = require('../../Models/SubjectModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const removeSubjectOutlines = async (req, res) => {

    let subject = await SubjectModel.findOne({ _id: req.params.subjectId })

    subject['outlines'].splice(req.params.position, 1)

    subject.save().then(data => {

        res.send({ message: 'Outline removed successfully', error: false, data: data });
    }).catch(err => {

        res.send({ message: 'Outline removal failed', error: true, data: err });
    })



}


module.exports.removeSubjectOutlines = removeSubjectOutlines

