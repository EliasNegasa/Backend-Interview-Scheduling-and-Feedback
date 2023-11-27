import asyncHandler from 'express-async-handler';
import Candidate from '../models/candidate.js';
import generateUrl from '../utils/generate-url.js';
import Client from '../models/client.js';

const createCandidate = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const createdBy = req.user._id;

  const oldCandidate = await Candidate.find({
    $or: [{ email: email }, { phoneNumber: phoneNumber }],
  });
  if (oldCandidate.length > 0) {
    return res.status(400).json({
      msg: `you have the candidate on your database before!`,
      oldCandidate,
    });
  } else {
    const { currentClient, ...candidateData } = req.body;
    const candidate = await Candidate.create({
      ...candidateData,
      currentClient,
      createdBy,
    });
    console.log(createdBy);
    console.log(currentClient);
    const forClient = await Client.findById(currentClient);
    const response = {
      ...candidate.toObject(),
      name: forClient.name,
    };

    res.status(201).json(response);
  }
});

const getCandidates = asyncHandler(async (req, res) => {
  const { page = 1, limit = 15, sort, ...filterQueries } = req.query;

  const total = await Candidate.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    res.status(404);
    throw new Error('Page not Found');
  }

  const candidates = await Candidate.find(filterQueries)
    .populate('user')
    .populate('currentClient')
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
  const candidate = await Candidate.findById(req.params.id)
    .populate('user', '-password')
    .populate('currentClient');

  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }

  res.status(200).json(candidate);
});
const updateCandidate = asyncHandler(async (req, res) => {
  const updatedBy = req.user._id;

  const candidate = await Candidate.findByIdAndUpdate(
    req.params.id,
    req.body,
    updatedBy,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(candidate);
});
const deleteCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, {
    isActive: false,
  });

  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.status(200).json({ message: 'User Deleted' });
});

export {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
};
