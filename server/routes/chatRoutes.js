const router = require('express').Router();

const db = require('../models/db');
const User = db.User;
const ChatBox = db.ChatBox;

const middlewares = require('../utils/middlewares');

router.post(
    '/:id',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.params.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});

        const chatBox = await ChatBox.findOne({participants: [user._id, req.decoded.id]});
        if (chatBox) return res.status(200).json({message: 'ChatBox found', chatBox: chatBox});
        try {
            const newChatBox = await ChatBox.create({
                participants: [user._id, req.decoded.id],
                name: null
            });
            await user.save();
            res.status(200).json({message: 'ChatBox created', chatBox: newChatBox});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

module.exports = router;