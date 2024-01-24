
const jwt = require('jsonwebtoken')
const { checkEmail } = require('../checkEmail')


const { ChapterModel } = require('../../Models/ChapterModel')

const getChapters = async (req, res) => {

    let data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    console.log("Hey1", data)

    if (data) {
        const user = await checkEmail(data.email)
        console.log("Hey2", user)
        if (user) {
            if (user.role != 'admin') {

                if (user.toObject().hasOwnProperty('course') && user.course.isPremium) {
                    console.log("Hey4")
                    ChapterModel.find({ subjectId: req.params.subjectId }).populate(['subjectId', 'curriculumId']).then(data => {
                        res.status(200).send({ message: 'All chapter ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No chapter found', error: true, data: err })
                    })


                }
                else {
                    console.log("Hey5")
                    ChapterModel.find({ subjectId: req.params.subjectId, paid: false }).populate(['subjectId', 'curriculumId']).then(data => {
                        res.status(200).send({ message: 'All chapter ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No chapter found', error: true, data: err })
                    })

                }


            }
            else {
                console.log("Hey6")
                ChapterModel.find({ subjectId: req.params.subjectId }).populate(['subjectId', 'curriculumId']).then(data => {
                    res.status(200).send({ message: 'All chapter ', error: false, data: data })
                }).catch(err => {
                    res.send({ message: 'No chapter found', error: true, data: err })
                })



            }
        }
        else {
            console.log("err7")
            res.send({ message: 'User not found', error: true });
        }
    }
    else {
        console.log("err8")
        req.send({ message: 'Not verified', error: true })
    }

}

module.exports.getChapters = getChapters
