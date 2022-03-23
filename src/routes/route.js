const express = require('express');
const router =  express.Router() ;
const collegeControllers = require("../controllers/collegeContollers")
const internControllers = require("../controllers/internControllers")

router.post("/colleges", collegeControllers.createCollege);
router.post("/interns", internControllers.createIntern);
router.get("/collegeDetails", collegeControllers.collegeDetails)

module.exports = router;