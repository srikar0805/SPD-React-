const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();

const transController = require("../controllers/transController");

router.post("/postdata", transController.postdata);
router.post("/getTrans", transController.getTrans);
router.post("/nums", transController.getnum);
router.post("/deleteTrans", transController.deleteTrans);

module.exports = router;
