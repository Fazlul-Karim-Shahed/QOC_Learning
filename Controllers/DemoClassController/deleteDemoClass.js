

const { DemoClassModel } = require('../../Models/DemoClassModel')

const deleteDemoClass = async (req, res) => {



    DemoClassModel.deleteOne({ _id: req.params.demoClassId }).then(data => {

        res.status(200).send({ message: 'demoClass Deleted', error: false, data: data })

    }).catch(err => {

        res.send({ message: 'Not deleted', error: true, data: err.message })

    })



}

module.exports.deleteDemoClass = deleteDemoClass
