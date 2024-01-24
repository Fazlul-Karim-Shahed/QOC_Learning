



const jwt = require('jsonwebtoken')
const { SubjectModel } = require('../../Models/SubjectModel')
const { checkEmail } = require('../checkEmail')

const getSubjects = async (req, res) => {

    const data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

    if (data) {
        const user = await checkEmail(data.email)

        if (user) {

            if (user.role != 'admin') {

                if (user.hasOwnProperty('course') && user.course.isPremium) {

                    SubjectModel.find({ curriculumId: req.params.curriculumId }).populate(['curriculumId']).then(data => {
                        res.status(200).send({ message: 'All Subjects ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No Subjects found', error: true, data: err })
                    })

                }
                else {

                    SubjectModel.find({ curriculumId: req.params.curriculumId, paid: false }).populate(['curriculumId']).then(data => {
                        res.status(200).send({ message: 'All Subjects ', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No Subjects found', error: true, data: err })
                    })

                }


            }
            else {

                SubjectModel.find({ curriculumId: req.params.curriculumId }).populate(['curriculumId']).then(data => {
                    res.status(200).send({ message: 'All Subjects ', error: false, data: data })
                }).catch(err => {
                    res.send({ message: 'No Subjects found', error: true, data: err })
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

module.exports.getSubjects = getSubjects
