const mongoose = require('mongoose');

const eventJoinSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('EventJoin', eventJoinSchema);