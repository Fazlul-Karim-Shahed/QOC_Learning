
const router = require('express').Router()
const {createFocus } = require('../Controllers/FocusController/createFocus')



router.post('/', createFocus)



module.exports = router