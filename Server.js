
const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const _ = require("lodash");
const path = require("path");
const AuthRouters = require("./Routers/AuthRouters");
const TuitionRouters = require("./Routers/TuitionRouters");
const TeacherRouters = require("./Routers/TeacherRouters");
const StudentRouters = require("./Routers/StudentRouters");
const SubjectRouters = require("./Routers/SubjectRouters");
const CurriculumRouters = require("./Routers/CurriculumRouters");
const ChapterRouters = require("./Routers/ChapterRouters");
const ModuleRouters = require("./Routers/ModuleRouters");
const McqRouters = require("./Routers/McqRouters");
const BroadQuestionRouters = require("./Routers/BroadQuestionRouters");
const AssignmentRouters = require("./Routers/AssignmentRouters");
const ExamRouters = require("./Routers/ExamRouters");
const BatchRouters = require("./Routers/BatchRouters");
const FocusRouters = require("./Routers/FocusRouters");
const ResourceRouters = require("./Routers/ResourceRouters");
const TransactionRouters = require("./Routers/TransactionRouters");
const UpcomingCourseRouters = require("./Routers/UpcomingCourseRouters");
const DemoClassRouters = require("./Routers/DemoClassRouters");
const NoticeRouters = require("./Routers/NoticeRouters");
const FileRouters = require("./Routers/FileRouters");

// ------------ Configuration ------------  //


dotenv.config();
const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }))
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(compression());


// Local DB
mongoose.connect(process.env.MONGODB_LOCAL + '/QOC_Learning')
  .then(data => console.log('Successfully connected to MongoDB Server'))
  .catch(data => {
    console.log(data);
    console.log('Something went wrong with MongoDB Server')
  })

// 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
// ------------ Database ------------  //
// const DB = process.env.MONGODB_DATABASE.replace(
//   "<password>",
//   process.env.MONGODB_PASS
// );
// mongoose.set("strictQuery", false);
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((data) => console.log("Successfully connected to MongoDB Server!"))
//   .catch((data) => {
//     console.log("Something went wrong with MongoDB Server");
//     console.log(data);
//   });


// ------------ All Routers ------------ //
app.use("/api/auth", AuthRouters);
app.use("/api/tuition", TuitionRouters);
app.use("/api/student", StudentRouters);
app.use("/api/teacher", TeacherRouters);
app.use("/api/subject", SubjectRouters);
app.use("/api/curriculum", CurriculumRouters);
app.use("/api/chapter", ChapterRouters);
app.use("/api/module", ModuleRouters);
app.use("/api/mcq", McqRouters);
app.use("/api/broad-question", BroadQuestionRouters);
app.use("/api/exam", ExamRouters);
app.use("/api/assignment", AssignmentRouters);
app.use("/api/batch", BatchRouters);
app.use("/api/focus", FocusRouters);
app.use("/api/resource", ResourceRouters);
app.use("/api/transaction", TransactionRouters);
app.use("/api/upcoming-course", UpcomingCourseRouters);
app.use("/api/demo-class", DemoClassRouters);
app.use("/api/notice", NoticeRouters);
app.use("/api/files", FileRouters);

app.use('/api/uploads/:name', (req, res) => {
  res.sendFile(path.resolve('./uploads/' + req.params.name))
});

app.get('/', (req, res) => res.sendFile(path.resolve('./Server.html')))


// Express async error handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// ------------ Server ------------ //

const port = 3011
app.listen(port, () => {
  console.log('Server is running on port ' + port);
})
