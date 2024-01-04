
const { default: axios } = require('axios')
const formData = require('form-data')
const generateUniqueId = require('generate-unique-id')
// const axios = require('axios').default
// const generateUniqueId = require('generate-unique-id')
// const { Orders } = require('../../../Models/OrderModel')
// const { Carts } = require('../../../Models/CartModel')


const createAssignmentPayment = async (req, res) => {

    let data = req.body

    const payData = {

        store_id: 'shahe6596af62b67e9',
        store_passwd: 'shahe6596af62b67e9@ssl',
        total_amount: 500,
        currency: 'BDT',
        // tran_id: generateUniqueId({ length: 35, useNumbers: true, useLetters: true }),
        tran_id: generateUniqueId({ length: 20, useNumbers: true, useLetters: true }),
        product_category: 'online_service',
        success_url: 'https://onu-project-38acc.firebaseapp.com/success',
        fail_url: 'https://onu-project-38acc.firebaseapp.com/fail',
        cancel_url: 'https://onu-project-38acc.firebaseapp.com/cancel',
        ipn_url: 'https://qoc-learning.onrender.com/api/assignment/payment/ipn',
        // ipn_url: 'http://localhost:4002/api/assignment/payment/ipn',


        // EMI Transaction
        emi_option: 0,

        //Customer Information
        cus_name: 'data.name',
        cus_email: 'data.email',
        cus_add1: 'data.address',
        cus_city: 'data.city',
        cus_postcode: 'data.postCode',
        cus_country: 'Bangladesh',
        cus_phone: 'data.phone',

        //Shipping Information
        shipping_method: 'NO',
        num_of_item: 1,
        weight_of_item: 0,
        logistic_pickup_id: 'nai',
        logistic_delivery_type: '',

        //Product Information
        product_name: 'Online Assignment Help',
        product_category: 'Online Service',
        product_profile: 'non-physical-goods',
    }


    let obj = {}

    

    axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', payData, {
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    }).then(data => {
        console.log(data.data);
    })




}


module.exports.createAssignmentPayment = createAssignmentPayment