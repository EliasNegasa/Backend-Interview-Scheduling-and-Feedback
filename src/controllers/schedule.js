import asyncHandler from 'express-async-handler';
import generateUrl from '../utils/generate-url';
import Schedule from '../models/schedule';

const getScheduleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findById(id);

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
  const schedule = await Schedule.create(req.body);

  res.status(201).json(schedule);
});

const updateSchedule = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findById(id);

  if (!schedule) {
    res.status(404);
    throw new Error('Schedule not Found');
  }

  const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
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
