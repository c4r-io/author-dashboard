import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const StudentSubmittedQuestionCounter =
  mongoose.models?.StudentSubmittedQuestionCounter ||
  mongoose.model('StudentSubmittedQuestionCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await StudentSubmittedQuestionCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `studentSubmittedQuestion-${counter.sequenceValue}`;
}
const studentSubmittedQuestionSchema = mongoose.Schema(
  {
    content: {
      type: String,
    },
    studentSubmittedQuestionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
studentSubmittedQuestionSchema.pre('save', async function (next) {
  if (!this.studentSubmittedQuestionId) {
    this.studentSubmittedQuestionId = await getNextId(
      'studentSubmittedQuestionRegistrationCounter',
    );
  }
  next();
});
const StudentSubmittedQuestion =
  mongoose.models.StudentSubmittedQuestion ||
  mongoose.model('StudentSubmittedQuestion', studentSubmittedQuestionSchema);
export default StudentSubmittedQuestion;
