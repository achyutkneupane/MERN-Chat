const router = require('express').Router();

router.use('/auth', require('./authroutes'));
router.use('/chatbox', require('./chatBoxRoutes'));

module.exports = router;