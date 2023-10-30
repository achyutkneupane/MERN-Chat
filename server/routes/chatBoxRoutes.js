const router = require('express').Router();
const middlewares = require('../utils/middlewares');

const db = require('../models/db');
const User = db.User;
const ChatBox = db.ChatBox;
const Message = db.Message;

router.get(
    '/',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id}).populate({
            path: 'chatBoxes',
            populate: {
                path: 'lastMessage'
            }
        });
        if (!user) return res.status(500).json({message: 'User not found'});
        try {
            const chatBoxes = user.chatBoxes.map((item) => {
                return {
                    ...item._doc,
                    lastMessage: item.lastMessage?.content || null,
                    lastMessageTime: item.lastMessage?.createdAt || null,
                    iAmLastSender: item.lastMessage?.sender.equals(user._id) || null,
                    isUnread: false
                }
            });
            res.status(200).json({message: 'ChatBoxes found', chatBoxes: chatBoxes || []});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

router.post(
    '/create',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id});
        if (!user) return res.status(500).json({message: 'User not found'});
        try {
            const chatBox = await ChatBox.create({
                participants: [user._id],
                name: `${user.firstName} ${user.lastName}`
            });
            await user.save();
            res.status(200).json({message: 'ChatBox created', chatBox: chatBox});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

router.get(
    '/:id',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});
        const chatBox = user.chatBoxes.find(item => item._id.equals(req.params.id));
        if (!chatBox) return res.status(500).json({message: 'Invalid request'});
        try {
            const chatBoxWithMessages = await ChatBox.findOne({_id: chatBox._id}).populate('messages');
            const messages = chatBoxWithMessages.messages.map((item) => {
                return {
                    ...item._doc,
                    isMe: item.sender.equals(user._id)
                }
            });
            res.status(200).json({message: 'Messages Fetched', messages: messages || []});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

router.post(
    '/:id',
    middlewares.authenticated,
    async (req, res) => {
        const user = await User.findOne({_id: req.decoded.id}).populate('chatBoxes');
        if (!user) return res.status(500).json({message: 'User not found'});
        const chatBox = user.chatBoxes.find(item => item._id.equals(req.params.id));
        if (!chatBox) return res.status(500).json({message: 'Invalid request'});
        try {
            await Message.create({
                chatBox: chatBox._id,
                sender: user._id,
                content: req.body.content,
                replyTo: req.body.replyTo || null,
                isForwarded: req.body.isForwarded || false
            });
            res.status(200).json({message: 'Message sent'});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
);

module.exports = router;