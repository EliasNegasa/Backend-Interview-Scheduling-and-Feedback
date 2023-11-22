import mongoose from 'mongoose';
import validator from 'validator';

import { Schema } from 'mongoose';

const clientSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter Client Name'],
  },
  parent: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    immutable: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
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
{timestamps:true});

const Client = mongoose.model('Client', clientSchema);

export default Client;
