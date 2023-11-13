import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter firstname'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter lastname'],
    },
    surName: {
      type: String,
      required: [true, 'Please enter middlename'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      immutable: true,
      validate: [validator.isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['Candidate', 'Recruiter', 'Interviewer', 'Receptionist'],
        message:
          'Role can only be Candidate, Recruiter, Interviewer, Receptionist',
      },
    },
    technicalRecruiter: {
      type: [String],
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
