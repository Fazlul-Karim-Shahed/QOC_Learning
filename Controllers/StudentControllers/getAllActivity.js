

const { StudentModel } = require('../../Models/StudentModel');
const { TransactionModel } = require('../../Models/TransactionModel');
const { ExamModel } = require('../../Models/ExamModel');
const { AssignmentModel } = require('../../Models/AssignmentModel');
const { BatchModel } = require('../../Models/BatchModel');
const { default: mongoose } = require('mongoose');
const { UpcomingCourseModel } = require('../../Models/UpcomingCourseModel');
const { NoticeModel } = require('../../Models/NoticeModel');

const getAllActivity = async (req, res) => {

    let submittedExam = await ExamModel.find({ "participants.studentId": new mongoose.Types.ObjectId(req.params.studentId) }).sort({ startTime: -1 }).limit(5);

    let postedAssignment = await AssignmentModel.find({ studentId: new mongoose.Types.ObjectId(req.params.studentId) }).limit(5)

    let batches = await BatchModel.find({ "enrolledStudents.studentId": new mongoose.Types.ObjectId(req.params.studentId) }).limit(5)

    let upcoming = await UpcomingCourseModel.find({ curriculumId: new mongoose.Types.ObjectId(req.user.curriculumId) }).limit(5)

    let transactions = await TransactionModel.find({ "userInfo.userId": new mongoose.Types.ObjectId(req.params.studentId) }).sort({ tranDate: -1 }).limit(5);

    let notice = await NoticeModel.find({}).sort({createdAt: -1});


    res.status(200).send({
        message: 'All activity', error: false, data: {
            submittedExam: submittedExam,
            postedAssignment: postedAssignment,
            batches: batches,
            upcomingCourse: upcoming,
            transactions: transactions,
            notice: notice
        }
    })

}

module.exports.getAllActivity = getAllActivity
