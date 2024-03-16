
// const jwt = require('jsonwebtoken')
// const { AdminSchema } = require('../Schemas/AdminSchema')
// const { EmployeeSchema } = require('../Schemas/EmployeeSchema')
// const { ShareholderSchema } = require('../Schemas/ShareholderSchema')

// const accessPermissionCheck = permission => {

//     return async (req, res, next) => {

//         try {
//             const data = await jwt.verify(req.headers.authorization, process.env.SECRET_KEY)

//             if (data) {

//                 let user = (data.role === 'admin') ? await AdminSchema.findOne({ email: data.email }) : (data.role === 'employee') ? await EmployeeSchema.findOne({ email: data.email }) : await ShareholderSchema.findOne({ email: data.email })

//                 if (user) {
//                     if (user.role === 'admin') {
//                         req.user = user
//                         next()
//                     }

//                     else {

//                         let currentPermission = user.accessPermission  // [{}, {}]

//                         let count = 0

//                         for (let i in currentPermission) {

//                             if (currentPermission[i].permission === permission) {
//                                 count = count + 1
//                                 break
//                             }
//                             else {
//                                 continue
//                             }

//                         }

//                         if (count > 0) {

//                             let tempAdminTime = user.tempAdminTime

//                             if (new Date().toLocaleString() < new Date(tempAdminTime).toLocaleString()) {
//                                 req.user = user
//                                 next()

//                             }
//                             else {
//                                 res.send({ message: `You are not currently authorized to view, take or change this decision. Authorization date expired on ${tempAdminTime}`, error: true });
//                             }



//                         }

//                         else {
//                             res.send({ message: `You are not currently authorized to view, take or change this decision`, error: true });
//                         }


//                     }

//                 }
//                 else {
//                     res.send({ message: 'User not found', error: true });
//                 }

//             }
//             else {
//                 req.send({ message: 'Not verified', error: true })
//             }




//         }
//         catch (err) {
//             // console.log(err)
//             res.send({ message: 'Something went wrong', error: true });
//         }


//     }

// }

// module.exports.accessPermissionCheck = accessPermissionCheck