
const { TeacherModel } = require("../../Models/TeacherModel")


const ipn = async (req, res) => {

    let data = req.body


    if (data.status === 'VALID') {

        let teacher = await TeacherModel.findOne({ _id: data.value_a })

        teacher['batch'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
        }

        teacher.save().then(data => {

            res.send({ message: `Transaction status: ${data.status}. batch premium service activated till ${new Date(data.batch.endTime).toLocaleString()}`, error: false, data: data });
        }).catch(err => {

            res.send({ message: 'Something went wrong while activating batch premium service. Please contact with QOC management', error: true, data: err.message });
        })


    }
    else {

        res.send({ message: 'Transaction status: ' + data.status, error: true })
        
    }


}


module.exports.ipn = ipn