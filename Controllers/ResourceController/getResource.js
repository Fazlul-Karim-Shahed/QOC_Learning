

const { ResourceModel } = require('../../Models/ResourceModel')

const getResource = async (req, res) => {

    let resource = await ResourceModel.find(req.body).populate(['curriculumId', 'subjectId'])

    if (resource.length != 0) {

        res.status(200).send({ message: 'All resource', error: false, data: resource })
    }
    else {
        res.send({ message: 'No resource found', error: true })
    }

}

module.exports.getResource = getResource
