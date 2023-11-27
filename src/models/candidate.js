import mongoose from 'mongoose';
import { Schema } from 'mongoose';

let CandidateSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    source: {
      type: String,
      enum: {
        values: ['Linkedin', 'Telegram Bot', 'Tiktok', 'Dereja', 'University'],
        message:
          'Source can only be Linkedin, Telegram bot, Tiktok, Dereja, University',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['Rejected', 'Interviewed', 'Pending', 'Offered'],
        message: 'Status can only be Rejected, Interviewed, Pending, Offered',
      },
    },
    currentClient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    currentInterviewStatus: {
      type: String,
      default: 'None',
      enum: {
        values: ['Phone', 'In-person', 'Client', 'Completed', 'None'],
        message: 'Status can only be Phone, Client, Completed, None',
      },
    },
    location: {
      type: String,
      require: [true, 'please enter Location'],
    },
    position: {
      type: String,
    },
    foreignName: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      immutable: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;
