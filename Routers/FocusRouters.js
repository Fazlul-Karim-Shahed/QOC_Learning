

const router = require("express").Router();
const { createFocus } = require("../Controllers/FocusController/createFocus");
const { deleteFocus } = require("../Controllers/FocusController/deleteFocus");
const { getFocus } = require("../Controllers/FocusController/getFocus");
const { updateFocus } = require("../Controllers/FocusController/updateFocus");
const {roleCheck} = require('../Middlewares/roleCheck')

router.post("/", roleCheck('admin'), createFocus);
router.post("/get", getFocus);
router.put("/:focusId", roleCheck('admin'), updateFocus);
router.delete("/:focusId", roleCheck('admin'), deleteFocus);

module.exports = router;
