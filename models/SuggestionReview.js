const mongoose = require('mongoose');

const suggestionReviewSchema = new mongoose.Schema({
    suggestionId: { type: mongoose.Schema.Types.ObjectId, ref: "Suggestion" },
    title: { type: String, required: false },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    createAt : { type: Date, default: Date.now },
    updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    updateAt : { type: Date, default: Date.now },
});

module.exports = mongoose.model('SuggestionReview', suggestionReviewSchema);