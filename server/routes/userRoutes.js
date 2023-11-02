const router = require('express').Router();

const db = require('../models/db');
const User = db.User;

const middlewares = require('../utils/middlewares');

router.get(
    '/',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id});
        if (!user) return res.status(500).json({message: 'User not found'});
        try {
            const exceptAuth = await User.find().where('_id').ne(user._id).select('-password');

            res.status(200).json({message: 'Users fetched.', users: exceptAuth});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

module.exports = router;