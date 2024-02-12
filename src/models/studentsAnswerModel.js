import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const StudentsAnswerCounter =
  mongoose.models?.StudentsAnswerCounter ||
  mongoose.model('StudentsAnswerCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await StudentsAnswerCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `studentsAnswer-${counter.sequenceValue}`;
}
const studentsAnswerSchema = mongoose.Schema(
  {
    researchQuestion: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ResearchQuestion' 
    },
    question1Answer: {
      type: String,
    },
    question2Answer: {
      type: String,
    },
    studentsAnswerId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
studentsAnswerSchema.pre('save', async function (next) {
  if (!this.studentsAnswerId) {
    this.studentsAnswerId = await getNextId(
      'studentsAnswerRegistrationCounter',
    );
  }
  next();
});
const StudentsAnswer =
  mongoose.models.StudentsAnswer ||
  mongoose.model('StudentsAnswer', studentsAnswerSchema);
export default StudentsAnswer;
