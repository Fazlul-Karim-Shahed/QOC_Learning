
const _ = require('lodash')
const jwt = require('jsonwebtoken');
const { checkEmail } = require('../checkEmail');
const bcrypt = require('bcrypt')


const signin = async (req, res) => {

    let user = await checkEmail(req.body.email)

    if (!user) {
        res.send({ message: 'User not found', error: true })
    }
    else {

        let checked = await bcrypt.compare(req.body.password, user.password)

        if (checked) {
            const token = jwt.sign(_.pick(user, ['username', 'role', 'email', '_id', 'mobile', 'curriculumId']), process.env.SECRET_KEY, { expiresIn: '5h' })
            res.send({
                message: 'Signin compete', error: false, value: {
                    token: token
                }
            })
        }
        else {
            res.send({ message: 'Password not matched', error: true })
        }

    }

}

module.exports.signin = signin
