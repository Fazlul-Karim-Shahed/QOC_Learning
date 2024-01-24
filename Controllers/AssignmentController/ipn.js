const { StudentModel } = require("../../Models/StudentModel")


const ipn = async (req, res) => {

    let data = req.body

    if (data.status === 'VALID') {

        let student = await StudentModel.findOne({ _id: data.value_a })

        student['assignment'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: data.tran_id
        }

        student.save().then(data => {
            res.send({ message: `Transaction status: ${data.status}. Assignment premium service activated till ${new Date(data.assignment.endTime).toLocaleString()}`, error: false, data: data });
        }).catch(err => {
            res.send({ message: 'Something went wrong while activating assignment premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {
        console.log({ message: 'Transaction status: ' + data.status})
        res.send({ message: 'Transaction status: ' + data.status, error: true })
    }


}


module.exports.ipn = ipn