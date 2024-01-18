import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const PythonExecutorUiCounter =
  mongoose.models?.PythonExecutorUiCounter ||
  mongoose.model('PythonExecutorUiCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await PythonExecutorUiCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `pythonExecutorUi-${counter.sequenceValue}`;
}
const pythonExecutorUiSchema = mongoose.Schema(
  {
    headerTitle: {
      type: String,
    },
    headerContent: {
      type: String,
    },
    headerFooter: {
      type: String,
    },
    pythonExecutorUiId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
pythonExecutorUiSchema.pre('save', async function (next) {
  if (!this.pythonExecutorUiId) {
    this.pythonExecutorUiId = await getNextId(
      'pythonExecutorUiRegistrationCounter',
    );
  }
  next();
});
const PythonExecutorUi =
  mongoose.models.PythonExecutorUi ||
  mongoose.model('PythonExecutorUi', pythonExecutorUiSchema);
export default PythonExecutorUi;
