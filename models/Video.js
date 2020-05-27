import mongoose from "mongoose";
// 모듈은 date
// 스키마는 형태
const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is rquired" // fileUrl 값이 없는 Video를 생성하려하면 error message가 나감.
  },
  title: {
    type: String,
    required: "Title is required"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    // 만든 날짜
    type: Date,
    default: Date.now
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("Video", VideoSchema);
export default model;
