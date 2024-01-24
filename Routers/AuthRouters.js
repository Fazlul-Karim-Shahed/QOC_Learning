const { signin } = require('../Controllers/UserControllers/signin')
const { signup } = require('../Controllers/UserControllers/signup')


const router = require('express').Router()

router.post('/signin', signin)
router.post('/signup', signup)

module.exports = router