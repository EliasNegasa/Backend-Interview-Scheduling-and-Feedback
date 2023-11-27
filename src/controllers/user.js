import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateUrl from '../utils/generate-url';

const generateUserResponse = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    surName: user.surName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    technicalRecruiter: user.technicalRecruiter,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    createdBy: user.createdBy,
    updatedBy: user.updatedBy,
  };
};

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.status(200).json(user);
});

const getUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sort, ...filterQueries } = req.query;

  const total = await User.countDocuments(filterQueries);

  if (page > Math.ceil(total / limit) && total > 0) {
    res.status(404);
    throw new Error('Page not Found');
  }

  const users = await User.find(filterQueries)
    .select('-password')
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
      prev: page > 1 ? generateUrl(page - 1, limit, sort, 'users') : null,
      self: req.originalUrl,
      next:
        page * limit < total
          ? generateUrl(+page + 1, limit, sort, 'users')
          : null,
    },
    data: users,
  });
});

const createUser = asyncHandler(async (req, res) => {
  req.body.createdBy = req.user._id;

  const user = await User.create(req.body);

  res.status(201).json(generateUserResponse(user));
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const { password } = req.body;
  req.body.updatedBy = userId;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  if (userId.toString() !== user.createdBy.toString()) {
    res.status(403);
    throw new Error('Not Authorized to update this user');
  }

  if (password) {
    req.body.password = await user.updatePassword(password);
  }

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(generateUserResponse(updatedUser));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  req.body.updatedBy = userId;

  if (userId.toString() === id.toString()) {
    res.status(400);
    throw new Error('You cannot delete your own account');
  }

  const user = await User.findByIdAndUpdate(id, { isActive: false });

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.status(200).json({ message: 'User Deleted' });
});

export { getUserById, getUsers, createUser, updateUser, deleteUser };
