import mongoose, { Schema } from 'mongoose';
import Feedback from './feedback';

const scheduleSchema = new Schema(
  {
    candidate: {
      type: Schema.Types.ObjectId,
      ref: 'Candidate',
    },
    date: {
      type: Date,
      required: [true, 'Interview Date and Time is required'],
    },
    duration: {
      type: Number,
      default: 15,
    },
    interviewType: {
      type: String,
      required: true,
      enum: {
        values: ['Phone', 'In-person', 'Client'],
        message: 'Interview Type can only be Phone, In-person, Client',
      },
    },
    position: {
      type: String,
    },
    interviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    attendance: {
      type: String,
      required: true,
      default: 'Pending',
      enum: {
        values: ['Pending', 'Came', 'Absent'],
        message: 'Attendance can only be Came, Absent or Pending',
      },
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    feedback: Feedback,
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

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
