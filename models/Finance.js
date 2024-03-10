const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({
    year: { type: String, required: false },
    month: { type: String, required: false },
    ord: { type: Number, required: false },
    type : { type: String, required: false },
    inExType: { type: String, required: false },
    title: { type: String, required: false },
    amt: { type: String, required: false },
    description: { type: String, required: false },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('Finance', FinanceSchema);