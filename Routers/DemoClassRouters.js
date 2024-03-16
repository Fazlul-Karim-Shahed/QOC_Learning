const { createDemoClass } = require("../Controllers/DemoClassController/createDemoClass");
const { deleteDemoClass } = require("../Controllers/DemoClassController/deleteDemoClass");
const { getDemoClass } = require("../Controllers/DemoClassController/getDemoClass.js");
const { updateDemoClass } = require("../Controllers/DemoClassController/updateDemoClass");
const { roleCheck } = require('../Middlewares/roleCheck.js')


const router = require("express").Router();


router.post("/", roleCheck('admin'), createDemoClass);
router.get("/", getDemoClass);
router.put("/:demoClassId", roleCheck('admin'), updateDemoClass);
router.delete("/:demoClassId", roleCheck('admin'), deleteDemoClass);

module.exports = router;
