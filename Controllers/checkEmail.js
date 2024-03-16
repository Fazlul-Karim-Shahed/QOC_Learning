const { AdminModel } = require("../Models/AdminModel")
const { StudentModel } = require("../Models/StudentModel")
const { TeacherModel } = require("../Models/TeacherModel")




const checkEmail = async (email) => {

    let studentMailCheck = await StudentModel.findOne({ email: email })
    let teacherMailCheck = await TeacherModel.findOne({ email: email })
    let adminMailCheck = await AdminModel.findOne({ email: email })

    let data = (studentMailCheck) ? studentMailCheck : (teacherMailCheck) ? teacherMailCheck : (adminMailCheck) ? adminMailCheck : null

    return data
}


exports.checkEmail = checkEmail