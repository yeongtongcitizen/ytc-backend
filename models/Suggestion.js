const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        type: { type: String, default: "Idea", enum: ["Idea", "Featured", "Completed"] },
        status: { type: String, default: "Request", enum: ["Request", "Inprogress", "Completed", "Drop"] },
        title: { type: String, required: false},
        description: { type: String, required: false},
        image: { type: String, required: false },
        problem: { type: String, required: false },
        idea: { type: String, required: false },
        benefit: { type: String, required: false },
        result: { type: String, required: false },
        rating: { type: Number, default: 0.0 },
        createBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        createAt: { type: Date, default: Date.now },
        updateBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        updateAt: { type: Date, default: Date.now },
    }, { timestamps: true }
);


SuggestionSchema.virtual("great", { // 참석한 회원 가져오기
    localField: "_id",
    ref: "Great",
    foreignField: "targetId",
});

module.exports = mongoose.model("Suggestion", SuggestionSchema)