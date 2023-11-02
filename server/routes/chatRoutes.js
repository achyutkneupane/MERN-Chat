const router = require('express').Router();

const db = require('../models/db');
const User = db.User;
const ChatBox = db.ChatBox;

const middlewares = require('../utils/middlewares');
const {fullName} = require("../utils/helpers");

router.post(
    '/group',
    middlewares.authenticated,
    async (req, res) => {
        const {name, receiverIds} = req.body;
        const user = await User.findOne({_id: req.decoded.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});
        try {
            const chatBox = await ChatBox.create({
                participants: [...receiverIds, user._id],
                name: name
            });
            await user.save();
            res.status(200).json({message: 'ChatBox created', chatBox: chatBox});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    });

router.post(
    '/:id',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.params.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});

        const chatBox = await ChatBox.findOne({participants: {$all: [user._id, req.decoded.id]}});
        if (chatBox) return res.status(200).json({message: 'ChatBox found', chatBox: {
                ...chatBox._doc,
                name: `${fullName(user['firstName'], user['middleName'], user['lastName'])}`
            }
        });
        try {
            const newChatBox = await ChatBox.create({
                participants: [user._id, req.decoded.id],
                name: null
            });
            const chatBoxWithName = {
                ...newChatBox._doc,
                name: `${fullName(user['firstName'], user['middleName'], user['lastName'])}`
            };
            res.status(200).json({message: 'ChatBox created', chatBox: chatBoxWithName});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);



module.exports = router;