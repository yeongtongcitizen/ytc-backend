const mongoose = require('mongoose');

const eventFileListSchema = new mongoose.Schema({
    fileUrl: { type: String, required: false },
    like: { type: Number },
}, {timestamps: true});

const eventFileSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    description: { type: String, required: true },
    like: { type: Number },
    fileType: { type: String, default: "Picture", enum: ["Picture", "Video"]},
    fileList: [eventFileListSchema],
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
    updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updateAt : { type: Date, default: Date.now },
}, {timestamps: true});

module.exports = mongoose.model('EventFile', eventFileSchema);


