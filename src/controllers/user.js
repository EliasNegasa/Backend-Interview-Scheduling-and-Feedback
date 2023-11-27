import asyncHandler from 'express-async-handler';
import User from '../models/user';
import generateUrl from '../utils/generate-url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const generateToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "1d"  });
};
const generateUserResponse = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
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
  const createdBy = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
  const userData = { ...req.body, createdBy }; // Merge createdBy field into the request body
  const user = await User.create(userData);

  res.status(201).json({
    message:'User Successfully Registered',
    _id:user._id,
    name:user.firstName,
    email:user.email,
    role:user.role,
    isActive:user.isActive,
    createdBy:user.createdBy,
    technicalRecruiter:user.technicalRecruiter,
    token:generateToken(user._id)
})        
});
const  LoginUser=asyncHandler(async(req,res)=>{
  const {email,password}=req.body;
  try {
      if(!email||!password){
          return   res.status(400).json({msg:'please fill out all form'})
      }
      const userExists = await User.findOne({email});
      if(userExists){
      const pass = await bcrypt.compare(password,userExists.password)


      if(userExists&&pass){
          res.status(200).json({
              message:'User Successfully logged',
              _id:userExists._id,
              name:userExists.name,
              email:userExists.email,
              role:userExists.role,
              isActive:userExists.isActive,
              createdBy:userExists.createdBy,
              technicalRecruiter:userExists.technicalRecruiter,
              token:generateToken(userExists._id)
          })
      }        
  else{
          return   res.status(400).json({msg:'invaid user credintial'})
      }   } 
  } catch (error) {
      console.log(error.message)
      res.status(500).json({message:error.message})
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  if (password) {
    req.body.password = await user.updatePassword(password);
  }
  const updatedBy = req.user._id; // Assuming the authenticated user's ID is stored in req.user._id
  const userData = { ...req.body, updatedBy }; // Merge createdBy field into the request body


  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(generateUserResponse(updatedUser));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedBy = req.user._id;
  const user = await User.findByIdAndUpdate(id, { isActive: false ,updatedBy});

  if (!user) {
    res.status(404);
    throw new Error('User not Found');
  }

  res.status(200).json({ message: 'User Deleted' });
});

export { getUserById, getUsers, createUser, updateUser, deleteUser, LoginUser };
