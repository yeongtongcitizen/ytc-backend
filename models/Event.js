const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    group: { type: String, default: "영통시민연대 일반활동", enum: ["영통시민연대 일반활동", "영통시민연대 임원회의",  "영통시민연대 정기모임",] },
    type: { type: String, default: "Upcomming", enum: ["Upcomming", "Meeting", "Featured"] },
    startAt: { type: Date, required: false },
    endAt: { type: Date, required: false },
    coords: {
        latitude: {type: Number , required: true},
        longitude: {type: Number , required: true},
        latitudeDelta:{type: Number , default: 0.0122},
        longitudeDelta: {type: Number , default: 0.0221},
        address: {type: String , required: true},
        title: {type: String , required: true},
    },
    rating: { type: Number, default:0, min: 0, max: 5 },
    like: { type: Number, min: 1, max: 5 },
    imageUrl: { type: Array, required: true },
    createBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createAt : { type: Date, default: Date.now },
    updateBy : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    updateAt : { type: Date, default: Date.now },
}, {timestamps: true});

eventSchema.virtual("joinUser", { // 참석한 회원 가져오기
    localField: "_id",
    ref: "EventJoin",
    foreignField: "eventId",
});

eventSchema.virtual("attendUser", { // 참석한 회원 가져오기
    localField: "_id",
    ref: "EventAttend",
    foreignField: "eventId",
});


module.exports = mongoose.model('Event', eventSchema);