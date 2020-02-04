//notify
//login
// page after login
// this will show location of place for collecting stubble
// will consist of a form for filling the details while collecting stubble 
// after picking will provide details to deliver the stubble to suitable warehouse (location of warehouse)
// delivered notification after delivering to warehouse

var express = require("express");
var router = express.Router();

//landing page
router.use('/', require('./landing'))


router.use('/form', require('./form'))
router.use('/fillForm', require('./fillForm'))
router.use('/status', require('./status'))



module.exports = router;