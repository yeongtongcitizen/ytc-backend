const mongoose = require('mongoose');

const eventRatingSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    rating: { type: Number, min: 1, max: 5 },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
    updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updateAt : { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('EventRating', eventRatingSchema);
