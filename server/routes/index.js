const router = require('express').Router();

router.use('/auth', require('./authroutes'));
router.use('/user', require('./userRoutes'));
router.use('/chatbox', require('./chatBoxRoutes'));
router.use('/chat', require('./chatRoutes'));

module.exports = router;