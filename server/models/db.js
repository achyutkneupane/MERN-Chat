const mongoose = require('../utils/mongoose');

const userSchema = require('./user');
const loginSchema = require('./login');
const messageSchema = require('./message');
const chatBoxSchema = require('./chatbox');

module.exports = {
    User: mongoose.model('User', userSchema),
    Login: mongoose.model('Login', loginSchema),
    Message: mongoose.model('Message', messageSchema),
    ChatBox: mongoose.model('ChatBox', chatBoxSchema),
};