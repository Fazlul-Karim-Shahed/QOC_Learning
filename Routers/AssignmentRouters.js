

const { createAssignment } = require('../Controllers/AssignmentController/createAssignment')
const { getAllAssignment } = require('../Controllers/AssignmentController/getAllAssignment')
const { roleCheck } = require('../Middlewares/roleCheck')
const { premiumCheck } = require('../Middlewares/premiumCheck') // dependent to roleCheck
const { createAssignmentPayment } = require('../Controllers/AssignmentController/createAssignmentPayment')
const { ipn } = require('../Controllers/AssignmentController/ipn')
const { checkAssignmentPremium } = require('../Controllers/AssignmentController/checkAssignmentPremium')


const router = require('express').Router()

router.post('/', roleCheck('student'), premiumCheck('assignment'), createAssignment)
router.post('/get', getAllAssignment)
router.post('/payment', createAssignmentPayment)
router.post('/payment/ipn', ipn)
router.get('/check-premium', roleCheck('student'), premiumCheck('premium'), checkAssignmentPremium)


module.exports = router