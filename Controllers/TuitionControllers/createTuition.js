const { TuitionModel } = require("../../Models/TuitionModel")


const createTuition = async (req, res) => {

    let allTuition = await TuitionModel.find()

    let data = req.body

    if (req.user.role === "admin") {
        data["approved"] = true
    }

    data["tuitionNumber"] = allTuition.length + 1


    data = new TuitionModel(req.body)

    // console.log(data)

    data.save().then(data => {

        res.status(200).send({ message: 'Tuition Created Successfully', error: false, data: data })

    })
        .catch(err => {
            // console.log(err)
            res.send({ message: 'Tuition Created Error', error: true, data: err.message })
        })



}

module.exports.createTuition = createTuition
