const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: {
            validator: true,
            message: 'Message content cannot be empty.'
        }
    },
    chatBox: {
        type: Schema.Types.ObjectId,
        ref: 'ChatBox'
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: null,
    },
    isForwarded: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

messageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = messageSchema;