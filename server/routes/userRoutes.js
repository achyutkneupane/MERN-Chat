const router = require('express').Router();

const db = require('../models/db');
const User = db.User;

const middlewares = require('../utils/middlewares');

router.get(
    '/',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});
        const chatBox = user.chatBoxes.find(item => item._id.equals(req.params.id));
        if (!chatBox) return res.status(500).json({message: 'Invalid request'});
        try {
            const allUsers = await User.find();

            res.status(200).json({message: 'Users fetched.', users: allUsers});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);