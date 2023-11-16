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
  comment: {
    type: String,
  },
});

export default feedbackSchema;
