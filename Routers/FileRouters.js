const { deleteFile } = require("../Controllers/FileController/deleteFile");
const { getAllFiles } = require("../Controllers/FileController/getAllFiles");

const router = require("express").Router();

router.delete("/:filename", deleteFile);
router.get("/", getAllFiles)

module.exports = router;
