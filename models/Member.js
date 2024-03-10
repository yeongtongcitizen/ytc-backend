const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        level : { type: String, required: false },
        type: { type: String, default: "5", enum: ["1", "2", "3", "4", "5"] },
        ord: {type: Number , required: true},
        status: { type: String, default: "정회원", enum: ["준회원", "정회원", "탈퇴"] },
        description: { type: String, required: false },
        image : { type: String, required: false },
        phone: { type: String, required: true },
        address: { type: String, required: false },
        title: { type: String, required: false },
        latitude: {type: Number , required: true},
        longitude: {type: Number , required: true},
        joinDate: { type: Date, required: false },
        withdrawDate: { type: Date, required: false },
        createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        createAt : { type: Date, default: Date.now },
        updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        updateAt : { type: Date, default: Date.now },
    }, { timestamps: true }
);
module.exports = mongoose.model("Member", MemberSchema)