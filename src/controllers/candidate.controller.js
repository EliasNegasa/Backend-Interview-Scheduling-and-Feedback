import asyncHandler from 'express-async-handler';
import Candidate from '../models/candidate.js';
import generateUrl from '../utils/generate-url';


const generateCandidateResponse = (candidate) => {
    return {
      _id: candidate._id,
      firstName: candidate.firstName,
      middelName: candidate.middelName,
      lastName: candidate.lastName,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      source: candidate.source,
      currentClient: candidate.currentClient,
      currentInterviewStatus: candidate.currentInterviewStatus,
      status: candidate.status,
      location: candidate.location,
      appliedPostion: candidate.appliedPostion,
      redisterdBy: candidate.redisterdBy,
      updatedBy: candidate.updatedBy,
      resume: candidate.resume,
      RecomendedBy: candidate.RecomendedBy,
      overAllFeedBack: candidate.overAllFeedBack,
      registrationDate: candidate.registrationDate,
      updatedDate: candidate.updatedDate,
    };
  };

//@desc create candidate
//@route /api/candidate
//@access public

const createCandidate = asyncHandler(async (req, res) => {

    const email=req.body.email;
    const phoneNumber=req.body.phoneNumber;
    

    const oldCandidate = await  Candidate.find({$or:[{email:email},{phoneNumber:phoneNumber}]})
    if(oldCandidate.length>0){
              return res.status(400).json({msg:`you have the candidate on your database before!`,oldCandidate})
        }
    else{
        const candidate = await Candidate.create ( {...req.body,
            Candidate: req.user.id,})
            res.status(201).json(generateCandidateResponse(candidate));


    }});
const getCandidates = asyncHandler(async (req, res) => {
    const { page = 1, limit = 15, sort, ...filterQueries } = req.query;

    const total = await Candidate.countDocuments(filterQueries);
  
    if (page > Math.ceil(total / limit) && total > 0) {
      res.status(404);
      throw new Error('Page not Found');
    }
  
    const candidates = await Candidate.find(filterQueries)
      .collation({ locale: 'en', strength: 2 })
      .sort(sort || '-registrationDate')
      .skip((page - 1) * limit)
      .limit(+limit);
  
    res.status(200).json({
      metadata: {
        total,
        page: +page,
        limit: +limit,
      },
      links: {
        prev: page > 1 ? generateUrl(page - 1, limit, sort, 'candidates') : null,
        self: req.originalUrl,
        next:
          page * limit < total
            ? generateUrl(+page + 1, limit, sort, 'candidates')
            : null,
      },
      data: candidates,
    });
});
const getCandidateById = asyncHandler(async (req, res) => {

    const candidate = await Candidate.findById(req.params.id);

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }

    res.status(200).json(generateCandidateResponse(candidate));
});
const updateCandidate = asyncHandler(async (req, res) => {
const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(generateCandidateResponse(candidate));
});
const deleteCandidate = asyncHandler(async (req, res) =>  {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id,{ isActive: false });

    if (!candidate) {
      res.status(404);
      throw new Error('Candidate not found');
    }
    res.status(200).json({ message: 'User Deleted' });
});


    export { createCandidate,getCandidates,getCandidateById,updateCandidate,deleteCandidate };