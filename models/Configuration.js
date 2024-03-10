const mongoose = require("mongoose");

const ConfigurationSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        name : { type: String, required: true, unique: true },
        description: { type: String, required: false },
        key1Desc : { type: String, required: false },
        key1 : { type: String, required: false },
        key2Desc : { type: String, required: false },
        key2 : { type: String, required: false },
        attribute1Desc: { type: String, required: false },
        attribute1: { type: String, required: false },
        attribute2Desc: { type: String, required: false },
        attribute2: { type: String, required: false },
        attribute3Desc: { type: String, required: false },
        attribute3: { type: String, required: false },
        attribute4Desc: { type: String, required: false },
        attribute4: { type: String, required: false },
        attribute5Desc: { type: String, required: false },
        attribute5: { type: String, required: false },
        attribute6Desc: { type: String, required: false },
        attribute6: { type: String, required: false },
        attribute7Desc: { type: String, required: false },
        attribute7: { type: String, required: false },
        attribute8Desc: { type: String, required: false },
        attribute8: { type: String, required: false },
        attribute9Desc: { type: String, required: false },
        attribute9: { type: String, required: false },
        createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        createAt : { type: Date, default: Date.now },
        updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        updateAt : { type: Date, default: Date.now },
    }, { timestamps: true }
);

module.exports = mongoose.model("Configuration", ConfigurationSchema)