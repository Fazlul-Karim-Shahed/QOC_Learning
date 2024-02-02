

const { default: axios } = require('axios')
const formData = require('form-data')
const generateUniqueId = require('generate-unique-id')
const { BatchModel } = require('../../Models/BatchModel')
const { StudentModel } = require('../../Models/StudentModel')


const createJoiningBatchPayment = async (req, res) => {

    let batch = await BatchModel.findOne({ _id: req.body.batchId })
    let student = await StudentModel.findOne({ _id: req.body.studentId })

    const payData = {

        store_id: 'shahe6596af62b67e9',
        store_passwd: 'shahe6596af62b67e9@ssl',
        total_amount: batch.fees,
        currency: 'BDT',
        tran_id: generateUniqueId({ length: 20, useNumbers: true, useLetters: true }),
        product_category: 'online_service',
        success_url: 'https://qoc.api.koncept-tech.com/success',
        fail_url: 'https://qoc.api.koncept-tech.com/fail',
        cancel_url: 'https://qoc.api.koncept-tech.com/cancel',
        ipn_url: 'https://qoc.api.koncept-tech.com/api/batch/join/payment/ipn',


        // EMI Transaction
        emi_option: 0,

        //Customer Information
        cus_name: student.username ? student.username : 'Unknown',
        cus_email: student.email ? student.email : 'unknown@gmail.com',
        cus_add1: student.address ? student.address : 'Unknown',
        cus_city: student.city ? student.city : 'Unknown',
        cus_postcode: student.postCode ? student.zip : 'Unknown',
        cus_country: student.country ? student.country : 'Unknown',
        cus_phone: student.mobile ? student.mobile : 'Unknown',

        //Shipping Information
        shipping_method: 'NO',
        num_of_item: 1,
        weight_of_item: 0,
        logistic_pickup_id: 'none',
        logistic_delivery_type: '',

        //Product Information
        product_name: 'Joining Batch',
        product_category: 'Online Service',
        product_profile: 'non-physical-goods',

        //Additional Information
        value_a: req.body.batchId,
        value_b: req.body.studentId,
        
    }



    axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', payData, {
        headers: {
            "content-type": 'multipart/form-data'
        }
    }).then(data => {
        res.send({ message: 'Payment created successfully', error: false, data: data.data })
    })
        .catch(err => {
            res.send({ message: 'Something went wrong while creating payment. Please contact with QOC management', error: true, data: err.message })
        })




}


module.exports.createJoiningBatchPayment = createJoiningBatchPayment