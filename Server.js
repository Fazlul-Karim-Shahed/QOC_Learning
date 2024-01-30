require("express-async-errors");
const express = require("express");
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

// ------------ Configuration ------------  //


dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));

app.options("*", cors({ origin: '*', optionsSuccessStatus: 200}))
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', optionsSuccessStatus: 200}));
app.use(compression());



// ------------ Database ------------  //
const DB = process.env.MONGODB_DATABASE.replace(
  "<password>",
  process.env.MONGODB_PASS
);
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => console.log("Successfully connected to MongoDB Server"))
  .catch((data) => {
    console.log("Something went wrong with MongoDB Server");
    console.log(data);
  });


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


app.get("/", (req, res) => {
  res.send({ message: "Hey backend is here!!!", error: false });
});

// Express async error handlers
app.use((err, req, res, next) => {
  // console.log(err)
  if (err) return res.send({ message: err, error: true });
});

// ------------ Server ------------ //

const port = process.env.PORT | 9085
app.listen(port, () => {
  console.log('Server is running on port ' + port);
})
