const mongoose = require('../utils/mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
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

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.virtual('chatBoxes', {
    ref: 'ChatBox',
    localField: '_id',
    foreignField: 'participants',
    options: {
        sort: {
            'lastMessage.createdAt': -1,
        }
    }
});

userSchema.set('toJSON', {virtuals: true});

module.exports = userSchema;