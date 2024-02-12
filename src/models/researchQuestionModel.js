import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const ResearchQuestionCounter =
  mongoose.models?.ResearchQuestionCounter ||
  mongoose.model('ResearchQuestionCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await ResearchQuestionCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `researchQuestion-${counter.sequenceValue}`;
}
const researchQuestionSchema = mongoose.Schema(
  {
    questionType: {
      type: String,
    },
    question1: {
      type: String,
    },
    description1: {
      type: String,
    },
    question2: {
      type: String,
    },
    researchQuestionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
researchQuestionSchema.pre('save', async function (next) {
  if (!this.researchQuestionId) {
    this.researchQuestionId = await getNextId(
      'researchQuestionRegistrationCounter',
    );
  }
  next();
});
const ResearchQuestion =
  mongoose.models.ResearchQuestion ||
  mongoose.model('ResearchQuestion', researchQuestionSchema);
export default ResearchQuestion;
