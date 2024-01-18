import bcryptjs from 'bcryptjs';
import mongoose from 'mongoose';
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequenceValue: { type: Number, default: 0 },
});
export const UserCounter =
  mongoose.models?.UserCounter || mongoose.model('UserCounter', counterSchema);
async function getNextId(counterName) {
  const counter = await UserCounter.findByIdAndUpdate(
    counterName,
    { $inc: { sequenceValue: 1 } },
    { new: true, upsert: true },
  );
  return `user-${counter.sequenceValue}`;
}
const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true,
      default: 'self',
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
  if (!this.userId) {
    this.userId = await getNextId('userRegistrationCounter');
  }
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
