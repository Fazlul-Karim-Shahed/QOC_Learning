
const { ResourceModel } = require('../../Models/ResourceModel')
const jwt = require('jsonwebtoken')


const getResource = async (req, res) => {

    let resource
    let data

    

    if (req.headers.authorization) {

        data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

        if (data) {
            if (data.role === 'admin') {

                // admin
                resource = await ResourceModel.find({}).populate(['curriculumId', 'subjectId'])
            }
            else {
                // student / teacher
                resource = await ResourceModel.find({ $and: [{ startTime: { $lte: new Date() } }, { endTime: { $gt: new Date() } }] }).populate(['curriculumId', 'subjectId'])

            }
        }

        else {
            // unauthorized
            resource = await ResourceModel.find({ $and: [{ startTime: { $lte: new Date() } }, { endTime: { $gt: new Date() } }] }).populate(['curriculumId', 'subjectId'])
        }



    }
    else {
        // non-user
        resource = await ResourceModel.find({ $and: [{ startTime: { $lte: new Date() } }, { endTime: { $gt: new Date() } }] }).populate(['curriculumId', 'subjectId'])
    }

    




    if (resource.length != 0) {

        res.status(200).send({ message: 'All resource', error: false, data: resource })
    }
    else {
        res.send({ message: 'No resource found', error: true })
    }

}

module.exports.getResource = getResource
