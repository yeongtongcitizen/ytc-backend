const mongoose = require('mongoose');

const eventReviewSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    title: { type: String, required: false },
    comment: { type: String, required: false },
    rating: { type: Number, min: 1, max: 5 },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
    updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updateAt : { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventReview', eventReviewSchema);