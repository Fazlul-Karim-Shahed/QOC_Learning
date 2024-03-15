const fs = require("fs");
const { ExamModel } = require("../../Models/ExamModel");
const _ = require("lodash");
const { IncomingForm } = require("formidable");

const uploadSolution = async (req, res) => {

  let form = new IncomingForm();
  form.keepExtensions = true;

  let exam = await ExamModel.findOne({ _id: req.params.examId });

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send({ message: "solution upload failed", error: true });
    } else {
      if (files && Object.keys(files).length > 0) {

        if (files['solution'][0].size > 15 * 1024 * 1024) { // 15 mb
          return res.send({ message: 'Size must me less than 15 mb', error: true })
        }


        let x = new Promise((resolve) => {
          fs.readFile(files["solution"][0].filepath, (err, data) => {
            resolve({
              data: data,
              contentType: files["solution"][0].mimetype,
              name: files["solution"][0].originalFilename,
            });
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
