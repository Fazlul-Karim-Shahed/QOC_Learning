

const { DemoClassModel } = require('../../Models/DemoClassModel')



const updateDemoClass = async (req, res) => {

    DemoClassModel.findOneAndUpdate({ _id: req.params.demoClassId }, req.body).then(data => {
        res.send({ message: 'Demo class updated successfully', error: false, value: data });
    })
        .catch(err => {
            res.send({ message: 'Demo class update failed', error: true, value: err.message });
        })

}

module.exports.updateDemoClass = updateDemoClass

