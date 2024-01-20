

const router = require("express").Router();
const { createFocus } = require("../Controllers/FocusController/createFocus");
const { deleteFocus } = require("../Controllers/FocusController/deleteFocus");
const { getFocus } = require("../Controllers/FocusController/getFocus");
const { updateFocus } = require("../Controllers/FocusController/updateFocus");

router.post("/", createFocus);
router.post("/get", getFocus);
router.put("/:focusId", updateFocus);
router.delete("/:focusId", deleteFocus);

module.exports = router;
