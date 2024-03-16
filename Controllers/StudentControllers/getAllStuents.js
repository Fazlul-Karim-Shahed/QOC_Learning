

const { StudentModel } = require('../../Models/StudentModel')

const getAllStudent = async (req, res) => {

    await StudentModel.find().then(data => {

        res.status(200).send({ message: 'All students', error: false, data: data })

    })
        .catch(err => {
            res.send({ message: 'No student found', error: true, data: err })
    })


}

module.exports.getAllStudent = getAllStudent
