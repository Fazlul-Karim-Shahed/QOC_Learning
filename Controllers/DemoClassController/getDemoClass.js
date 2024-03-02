

const jwt = require('jsonwebtoken')
const { DemoClassModel } = require('../../Models/DemoClassModel')
const { checkEmail } = require('../checkEmail')

const getDemoClass = async (req, res) => {


    let demoClass = await DemoClassModel.find({})

    if (demoClass.length != 0) {

        res.status(200).send({ message: 'All demoClass', error: false, data: demoClass })
    }
    else {
        res.send({ message: 'No demoClass found', error: true })
    }

    

}

module.exports.getDemoClass = getDemoClass