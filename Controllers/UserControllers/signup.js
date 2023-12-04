
const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { checkEmail } = require('../checkEmail');
const { AdminModel } = require('../../Models/AdminModel');
const { TeacherModel } = require('../../Models/TeacherModel');
const { StudentModel } = require('../../Models/StudentModel');


const signup = async (req, res) => {


    let data = await checkEmail(req.body.email)

    if (data) {
        res.send({ message: 'User already exist', error: true })
    }
    else {

        data = _.pick(req.body, ['username', 'email', 'password', 'mobile', 'role']);
        let salt = await bcrypt.genSalt(10)
        let hashedPass = await bcrypt.hash(data.password, salt)

        data['password'] = hashedPass

        data = data.role === 'admin' ? new AdminModel(data) : data.role === 'teacher' ? new TeacherModel(data) : new StudentModel(data)

        data = data.save().then(data => {

            const token = jwt.sign(_.pick(data, ['username', 'role', 'email', '_id', 'mobile']), process.env.SECRET_KEY, { expiresIn: '10h' })
            res.send({
                message: 'Registration complete', error: false, value: {
                    token: token
                }
            })
        })
            .catch(err => {
                res.send({ message: 'Something went wrong while signup', error: true, value: err.message })
            })


    }

}

module.exports.signup = signup
