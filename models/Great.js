const mongoose = require('mongoose');

const greatSchema = new mongoose.Schema({
    targetId: { type: String, required: true },
    targetSource: { type: String, required: true },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('Great', greatSchema);