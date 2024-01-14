

const { default: mongoose } = require("mongoose")
const { BatchModel } = require("../../Models/BatchModel")


const joiningBatchIpn = async (req, res) => {

    let data = req.body

    if (data.status === 'VALID') {

        BatchModel.updateOne({ _id: data.value_a }, {
            $push: {
                enrolledStudents: {
                    studentId: new mongoose.Types.ObjectId(data.value_b),
                    createdAt: new Date().toLocaleString(),
                    transaction: data.tran_id,
                }
            }
        }).then(data => {

            console.log(data)
            res.send({ message: `Transaction status: ${data.status}. batch premium service activated till ${new Date(data.batch.endTime).toLocaleString()}`, error: false, data: data });

        }).catch(err => {
            console.log(err)
            res.send({ message: 'Something went wrong while activating batch premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {

        res.send({ message: 'Transaction status: ' + data.status, error: true })

    }


}


module.exports.joiningBatchIpn = joiningBatchIpn