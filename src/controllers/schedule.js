import asyncHandler from 'express-async-handler';
import generateUrl from '../utils/generate-url';
import Schedule from '../models/schedule';
import Candidate from '../models/candidate';
import Client from '../models/client';
import User from '../models/user';

const getScheduleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findById(id).populate([
    {
      path: 'candidate',
    },
    {
      path: 'interviewer',
      select: '-password',
    },
    {
      path: 'client',
    },
  ]);

  if (!schedule) {
    res.status(404);
    throw new Error('Schedule not Found');
  }

  res.status(200).json(schedule);
});

const getSchedules = asyncHandler(async (req, res) => {
  const { page = 1, limit = 100, sort, ...filterQueries } = req.query;

  const total = await Schedule.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    res.status(404);
    throw new Error('Page not Found');
  }

  const schedules = await Schedule.find(filterQueries)
    .populate([
      {
        path: 'candidate',
      },
      {
        path: 'interviewer',
        select: '-password',
      },
      {
        path: 'client',
      },
    ])
    .collation({ locale: 'en', strength: 2 })
    .sort(sort || '-createdAt')
    .skip((page - 1) * limit)
    .limit(+limit);

  res.status(200).json({
    metadata: {
      total,
      page: +page,
      limit: +limit,
    },
    links: {
      prev: page > 1 ? generateUrl(page - 1, limit, sort, 'schedules') : null,
      self: req.originalUrl,
      next:
        page * limit < total
          ? generateUrl(+page + 1, limit, sort, 'schedules')
          : null,
    },
    data: schedules,
  });
});

const createSchedule = asyncHandler(async (req, res) => {
  const createdBy = req.user._id;

  const { candidate, client, interviewer, ...scheduleData } = req.body;

  // Create the schedule with the proved data
  const schedule = await Schedule.create({
    ...scheduleData,
    candidate: candidate,
    client: client,
    interviewer: interviewer,
    createdBy,
  });

  const scheduledCandidate = await Candidate.findById(candidate);
  const forClient = await Client.findById(client);
  const interviewerFor = await User.findById(interviewer);
  const response = {
    ...schedule.toObject(),
    scheduledCandidate,
    forClient,
    interviewerFor,
  };

  res.status(201).json(response);
});

const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findById(id);

  if (!schedule) {
    res.status(404);
    throw new Error('Schedule not Found');
  }
  const updatedBy = req.user._id;
  const scheduleData = { ...req.body, updatedBy };
  const updatedSchedule = await Schedule.findByIdAndUpdate(id, scheduleData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedSchedule);
});

const deleteSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findByIdAndDelete(id);

  if (!schedule) {
    res.status(404);
    throw new Error('Schedule not Found');
  }

  res.status(200).json({ message: 'Schedule Deleted' });
});

export {
  getScheduleById,
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
