const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;

const chatBoxSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        required: false,
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

chatBoxSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

chatBoxSchema.virtual('messages', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chatBox',
});

chatBoxSchema.virtual('lastMessage', {
    ref: 'Message',
    localField: '_id',
    foreignField: 'chatBox',
    options: {
        sort: {
            createdAt: -1,
        }
    },
    justOne: true,
});

module.exports = chatBoxSchema;