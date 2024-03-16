
const { DemoClassModel } = require('../../Models/DemoClassModel');
const { cleanObject } = require('../cleanObject');

const createDemoClass = async (req, res) => {

    let demoClass = new DemoClassModel(cleanObject(req.body))

    demoClass.save().then(data => {

        res.send({ message: 'DemoClass created successfully', error: false, value: data });

    }).catch(err => {

        res.send({ message: 'DemoClass creation failed', error: true, value: err.message });
    })


}


module.exports.createDemoClass = createDemoClass

