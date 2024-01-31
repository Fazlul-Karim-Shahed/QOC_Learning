
const { StudentModel } = require("../../Models/StudentModel")
const { TransactionModel } = require("../../Models/TransactionModel")


const ipn = async (req, res) => {

    let data = req.body

    let student = await StudentModel.findOne({ _id: data.value_a })

    await TransactionModel.create({
        userInfo: {

            userId: student._id,
            username: student.username,
            mobile: student.mobile,
            email: student.email,
            role: student.role,

        },
        status: data.status,
        transId: data.tran_id,
        tranDate: data.tran_date,
        amount: data.currency_amount,
        title: 'Assignment'
    })

    if (data.status === 'VALID') {

        student['assignment'] = {
            isPremium: true,
            startTime: new Date().toLocaleString(),
            endTime: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleString(),
            transaction: data.tran_id
        }

        student.save().then(data => {
            console.log('Ass saved: ', data)
            
        }).catch(err => {
            console.log('Ass err: ', err)
            
        })


    }
    else {
        console.log('Assignment wrong')
    }


}


module.exports.ipn = ipn