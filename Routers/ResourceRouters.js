const { createResource } = require("../Controllers/ResourceController/createResource");
const { deleteResource } = require("../Controllers/ResourceController/deleteRource");
const { getResource } = require("../Controllers/ResourceController/getResource");
const { updateResource } = require("../Controllers/ResourceController/updateResource");

const router = require("express").Router();

router.post("/", createResource);
router.post("/get", getResource);
router.put("/:resourceId", updateResource);
router.delete("/:resourceId", deleteResource);

module.exports = router;
