import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const PythonExecutorIssueListCounter =
  mongoose.models?.PythonExecutorIssueListCounter ||
  mongoose.model('PythonExecutorIssueListCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await PythonExecutorIssueListCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `pythonExecutorIssueList-${counter.sequenceValue}`;
}
const pythonExecutorIssueListSchema = mongoose.Schema(
  {
    description: {
      type: String,
    },
    attachment: {
      type: Object,
    },
    pythonExecutorIssueListId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
pythonExecutorIssueListSchema.pre('save', async function (next) {
  if (!this.pythonExecutorIssueListId) {
    this.pythonExecutorIssueListId = await getNextId(
      'pythonExecutorIssueListRegistrationCounter',
    );
  }
  next();
});
const PythonExecutorIssueList =
  mongoose.models.PythonExecutorIssueList ||
  mongoose.model('PythonExecutorIssueList', pythonExecutorIssueListSchema);
export default PythonExecutorIssueList;
