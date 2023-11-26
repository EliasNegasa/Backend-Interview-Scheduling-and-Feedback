import mongoose from 'mongoose';
import { Schema } from 'mongoose';

let CandidateSchema = new Schema({
    // _id: mongoose.Schema.Types.ObjectId
    firstName:{
        type:String,
        require :[ true, 'please enter first name']
    },
    surName:{
        type:String,
        require :[ true, 'please enter sur name']
    },
    lastName:{
        type:String,
        require :[ true, 'please enter last name']
    },
    email:{
        type:String,
        require :[ true, 'please enter email']
    },
    phoneNumber: {
        type:String,
        require :[ true, 'please enter phoneNumber']
    },  
    source: String,
    currentClient: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    currentInterviewStatus: String,
    status: String,
    location: {
        type:String,
        require :[ true, 'please enter Location']
    },
    appliedPosition: {
        type:String,
        require :[ true, 'please enter position']
    },
    createdBy:{  type: Schema.Types.ObjectId, ref: 'user',    immutable: true, },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'user' },
    resume: String,
    RecommendedBy:String,
    overAllFeedBack: String,
    isActive: {
        type: Boolean,
        default: true,
      },
},{timestamps:true}
);

const Candidate = mongoose.model('Candidate', CandidateSchema);

export default Candidate;



