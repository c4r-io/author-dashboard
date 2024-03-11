import mongoose from 'mongoose';
const r2rMuSubmissionSchema = mongoose.Schema(
  {
    choosenUsers: {
      type: Object,
    },
    labid: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const R2rMuSubmission =
  mongoose.models.R2rMuSubmission ||
  mongoose.model('R2rMuSubmission', r2rMuSubmissionSchema);
export default R2rMuSubmission;
