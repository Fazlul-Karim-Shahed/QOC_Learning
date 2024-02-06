

const { default: axios } = require('axios');
const jwt = require('jsonwebtoken')

const bkashGrantToken = () => {

    return async (req, res, next) => {

        try {

            axios.post(process.env.bkash_grantTokenApi, {
                app_key: process.env.bkash_app_key,
                app_secret: process.env.bkash_app_secret_key
            }, {
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/json",
                    username: process.env.bkash_username,
                    password: process.env.bkash_password
                }
            }).then(data => {

                if (data.data.statusMessage === 'Successful') {
                    req.id_token = data.data.id_token
                    next()
                }
                else {
                    res.send({ message: 'Something went wrong while creating bkash grant token', error: true, data: data.data });
                }

            }).catch(err => {
                res.send({ message: 'Something went wrong while requesting bkash grant token', error: true, data: err });
            })

        }
        catch (err) {
            res.send({ message: 'Something went wrong', error: true, data: err.message });
        }


    }
}

module.exports.bkashGrantToken = bkashGrantToken