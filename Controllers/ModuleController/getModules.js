



const jwt = require('jsonwebtoken')
const { checkEmail } = require('../checkEmail')



const { ModuleModel } = require('../../Models/ModuleModel')

const getModules = async (req, res) => {

    const data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

    if (data) {
        const user = await checkEmail(data.email)

        if (user) {
            if (user.role != 'admin') {

                if (user.hasOwnProperty('course') && user.course.isPremium) {

                    ModuleModel.find({ chapterId: req.params.chapterId }).populate(['subjectId', 'curriculumId', 'chapterId']).then(data => {

                        res.status(200).send({ message: 'All module ', error: false, data: data })

                    }).catch(err => {
                        res.send({ message: 'No module found', error: true, data: err })
                    })


                }
                else {
                    ModuleModel.find({ chapterId: req.params.chapterId, paid: false }).populate(['subjectId', 'curriculumId', 'chapterId']).then(data => {

                        res.status(200).send({ message: 'All module ', error: false, data: data })

                    }).catch(err => {
                        res.send({ message: 'No module found', error: true, data: err })
                    })
                    

                }


            }
            else {

                ModuleModel.find({ chapterId: req.params.chapterId }).populate(['subjectId', 'curriculumId', 'chapterId']).then(data => {

                    res.status(200).send({ message: 'All module ', error: false, data: data })

                }).catch(err => {
                    res.send({ message: 'No module found', error: true, data: err })
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

module.exports.getModules = getModules
