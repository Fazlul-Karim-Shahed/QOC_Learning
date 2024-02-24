

const { FocusModel } = require('../../Models/FocusModel')
const { checkEmail } = require('../checkEmail')
const jwt = require('jsonwebtoken')

const getFocus = async (req, res) => {

    const data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)
    
    if (data) {
        
        const user = await checkEmail(data.email)

        if (user) {

            if (user.role != 'admin') {

                if (user.toObject().hasOwnProperty('course') && user.course.isPremium) {

                    FocusModel.find(req.body).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId']).then(data => {
                        res.status(200).send({ message: 'All focus', error: false, data: data })
                    }).catch(err => {
                        res.send({ message: 'No focus found', error: true, data: err.message })
                    })

                }
                else {

                    FocusModel.find(req.body).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId']).then(data => {

                        let freeFocus = []
                        // console.log(data.length)
                        for (let i = 0; i < data.length; i++) {

                            

                            if((data[i].moduleId && data[i].moduleId.paid) || (data[i].chapterId && data[i].chapterId.paid) || (data[i].subjectId && data[i].subjectId.paid) ){
 
                                continue
                            }
                            else{
                                freeFocus.push(data[i])
                            }
                            
                            
                        }

                        res.status(200).send({ message: 'All focus', error: false, data: freeFocus })
                    }).catch(err => {
                        res.send({ message: 'No focus found', error: true, data: err.message })
                    })

                }


            }
            else {

                FocusModel.find(req.body).populate(['curriculumId', 'subjectId', 'chapterId', 'moduleId']).then(data => {
                    res.status(200).send({ message: 'All focus', error: false, data: data })
                }).catch(err => {
                    res.send({ message: 'No focus found', error: true, data: err.message })
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

module.exports.getFocus = getFocus
