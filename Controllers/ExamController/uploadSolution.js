const fs = require("fs");
const { ExamModel } = require("../../Models/ExamModel");
const _ = require("lodash");
const { IncomingForm } = require("formidable");
const path = require("path");

const uploadSolution = async (req, res) => {

  let form = new IncomingForm();
  form.keepExtensions = true;

  let exam = await ExamModel.findOne({ _id: req.params.examId });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send({ message: "solution upload failed", error: true });
    } else {
      if (files && Object.keys(files).length > 0) {


        let x = new Promise((resolve) => {
          // const prefix = new Date().getTime() * Math.random()
          const prefix = ""
          const tempPath = files['solution'][0].filepath;
          const destinationPath = path.join(process.cwd(), "uploads", prefix + files['solution'][0].originalFilename);

          fs.copyFile(tempPath, destinationPath, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Failed to move the file to destination folder.' });
            }
            resolve({
              contentType: files['solution'][0].mimetype,
              name: prefix + files['solution'][0].originalFilename,
            })

          });
        });

        x.then((data) => {
          exam["solution"] = data;

          exam
            .save()
            .then((data) => {
              res.send({
                message: "solution created successfully",
                error: false,
                data: data,
              });
            })
            .catch((err) => {
              res.send({
                message: "solution creation failed",
                error: true,
                data: err.message,
              });
            });
        });
      } else {
        res.send({
          message: "solution creation failed. File must needed",
          error: true,
        });
      }
    }
  });
};

module.exports.uploadSolution = uploadSolution;
