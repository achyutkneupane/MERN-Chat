const router = require('express').Router();

router.use('/auth', require('./authroutes'));

module.exports = router;