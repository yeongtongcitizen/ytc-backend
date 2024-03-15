const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        profileImage : { type: String, required: false },
        uid: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        coords: {
            latitude: {type: Number , required: false},
            longitude: {type: Number , required: false},
            latitudeDelta:{type: Number , default: 0.0122},
            longitudeDelta: {type: Number , default: 0.0221},
            address: {type: String , required: false},
            title: {type: String , required: false},
        },
        snsType: { type: String, required: true },
        snsId: { type: String, required: true },
        userType: { type: String, required: false, enum: ['Admin', 'Client'] },
    }, { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema)