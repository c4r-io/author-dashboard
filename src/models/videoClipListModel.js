import mongoose from 'mongoose';
const videoClipListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
    },
    videoTitle: {
      type: String,
    },
    videoDetailsText: {
      type: String,
    },
    videoKeywords: {
      type: String,
    },
    thumbnail: {
      type: Object,
    },
    videoLink: {
      type: String,
    },
    careerStage: {
      type: String,
    },
    fieldOfResearch: {
      type: String,
    },
    institutionSelector: {
      type: String,
    },
    rigorTopic: {
      type: String,
    },
    nextLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const VideoClipList =
  mongoose.models.VideoClipList ||
  mongoose.model('VideoClipList', videoClipListSchema);
export default VideoClipList;
