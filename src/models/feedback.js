import { Schema } from 'mongoose';

const feedbackSchema = new Schema({
  result: {
    type: String,
    default: 'Pending',
    enum: {
      values: ['Pending', 'Passed', 'Failed'],
      message: 'Result can only be Pending, Failed, Passed',
    },
  },
  recommendedClient: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
  typingTestResult: {
    type: String,
  },
  testGorillaResult: {
    type: String,
  },
  enockResult: {
    type: String,
    enum: {
      values: ['Pending', 'Passed', 'Failed'],
      message: 'Enock Result can only be Pending, Failed, Passed',
    },
  },
  personalFeedback: {
    type: String,
  },
  educationalStatus: {
    type: String,
  },
  workStatus: {
    type: String,
  },
  rotaionalShift: {
    type: Boolean,
    default: false,
  },
  weekend: {
    type: Boolean,
    default: false,
  },
  training: {
    type: Boolean,
    default: false,
  },
  threeMonthContract: {
    type: Boolean,
    default: false,
  },
  salary: {
    type: Boolean,
    default: false,
  },
  kebelID: {
    type: Boolean,
    default: false,
  },
});

export default feedbackSchema;
