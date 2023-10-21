const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginsSchema = new Schema({
    id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userAgent: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Logins', loginsSchema);