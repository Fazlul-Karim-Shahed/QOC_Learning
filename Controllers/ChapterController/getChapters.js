
const jwt = require('jsonwebtoken')
const { checkEmail } = require('../checkEmail')


const { ChapterModel } = require('../../Models/ChapterModel')

const getChapters = async (req, res) => {

    let data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    

    if (data) {
        const user = await checkEmail(data.email)
        
        if (user) {
            if (user.role != 'admin') {

                if (user.toObject().hasOwnProperty('course') && user.course.isPremium) {
                    ChapterModel.find({ subjectId: req.params.subjectId }).populate(['subjectId', 'curriculumId']).then(data => {
                        res.status(200).send({ message: 'All chapter ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No chapter found', error: true, data: err })
                    })


                }
                else {
                    ChapterModel.find({ subjectId: req.params.subjectId, paid: false }).populate(['subjectId', 'curriculumId']).then(data => {
                        res.status(200).send({ message: 'All chapter ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No chapter found', error: true, data: err })
                    })

                }


            }
            else {
                ChapterModel.find({ subjectId: req.params.subjectId }).populate(['subjectId', 'curriculumId']).then(data => {
                    res.status(200).send({ message: 'All chapter ', error: false, data: data })
                }).catch(err => {
                    res.send({ message: 'No chapter found', error: true, data: err })
                })



            }
        }
        else {
            res.send({ message: 'User not found', error: true });
        }
    }
    else {
        req.send({ message: 'Not verified', error: true })
    }

}

module.exports.getChapters = getChapters
