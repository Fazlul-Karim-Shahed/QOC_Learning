const fs = require('fs')
const { CurriculumModel } = require('../../Models/CurriculumModel')
const _ = require('lodash')
const { IncomingForm } = require('formidable')


const removeCurriculumOutlines = async (req, res) => {

    console.log('hey')

    let curriculum = await CurriculumModel.findOne({ _id: req.params.curriculumId })

    curriculum['outlines'].splice(req.params.position, 1)

    curriculum.save().then(data => {

        res.send({ message: 'Outline removed successfully', error: false, data: data });
    }).catch(err => {
            
            res.send({ message: 'Outline removal failed', error: true, data: err });
    })
   


}


module.exports.removeCurriculumOutlines = removeCurriculumOutlines

