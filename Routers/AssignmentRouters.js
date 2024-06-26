
const router = require('express').Router()

const { createAssignment } = require('../Controllers/AssignmentController/createAssignment')
const { getAllAssignment } = require('../Controllers/AssignmentController/getAllAssignment')
const { roleCheck } = require('../Middlewares/roleCheck')
const { premiumCheck } = require('../Middlewares/premiumCheck') // dependent to roleCheck
const { createAssignmentPayment } = require('../Controllers/AssignmentController/createAssignmentPayment')
const { ipn } = require('../Controllers/AssignmentController/ipn')
const { checkAssignmentPremium } = require('../Controllers/AssignmentController/checkAssignmentPremium')
const { submitSolution } = require('../Controllers/AssignmentController/submitSolution')
const { bkashGrantToken } = require('../Middlewares/bkashGrantToken')




router.post('/', roleCheck('student'), premiumCheck('assignment'), createAssignment)
router.post('/get', getAllAssignment)
router.put('/:assignmentId', roleCheck('admin'), submitSolution)
router.post('/payment', roleCheck('student'), bkashGrantToken(), createAssignmentPayment)
router.get('/payment/ipn', ipn)
router.get('/check-premium', roleCheck('student'), premiumCheck('assignment'), checkAssignmentPremium)


module.exports = router