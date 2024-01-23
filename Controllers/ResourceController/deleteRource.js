

const { ResourceModel } = require('../../Models/ResourceModel')

const deleteResource = async (req, res) => {

    let resource = await ResourceModel.deleteOne({ _id: req.params.resourceId })

    if (resource) {

        res.status(200).send({ message: 'Deleted', error: false, data: resource })
    }
    else {
        res.send({ message: 'Not delete', error: true })
    }

}

module.exports.deleteResource = deleteResource
