
const jwt = require('jsonwebtoken')
const { checkEmail } = require('../Controllers/checkEmail')

const roleCheck = role => {

    return async (req, res, next) => {

        try {

            const data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

            if (data) {
                const user = await checkEmail(data.email)

                if (user) {
                    if (user.role === role || user.role === 'admin') {
                        req.user = user
                        // res.send('Verified')
                        next()
                    }
                    else {
                        res.send({ message: 'You are not ' + role, error: true })
                    }
                }
                else {
                    res.send({ message: 'User not found', error: true });
                }
            }
            else {
                req.send({ message: 'Not verified', error: true })
            }

        }
        catch (err) {
            res.send({ message: 'Something went wrong', error: true, data: err.message });
        }


    }
}

module.exports.roleCheck = roleCheck