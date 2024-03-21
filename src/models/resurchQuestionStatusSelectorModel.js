import mongoose from 'mongoose';
const resurchQuestionStatusSelectorSchema = mongoose.Schema(
  {
    status_1: {
      type: String,
    },
    status_1Image: {
      type: Object,
    },
    status_2: {
      type: String,
    },
    status_2Image: {
      type: Object,
    },
    status_3: {
      type: String,
    },
    status_3Image: {
      type: Object,
    },
  },
  {
    timestamps: true,
  },
);
const ResurchQuestionStatusSelector =
  mongoose.models.ResurchQuestionStatusSelector ||
  mongoose.model(
    'ResurchQuestionStatusSelector',
    resurchQuestionStatusSelectorSchema,
  );
export default ResurchQuestionStatusSelector;
