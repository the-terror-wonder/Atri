import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const userExists = await User.findOne({
      email
    });

    if (userExists) {
      res.status(501).json({
        message: "User Already Exist",
        value: false
      })
      throw new Error('User already exists');
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    res.status(503).json({
      message: 'An Error Occured',
      value: false,
      error
    })
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Admin cannot delete themselves');
    }
    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot delete an admin user');
    }
    await User.deleteOne({
      _id: user._id
    });
    res.json({
      message: 'User removed'
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};


// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const {
    email,
    password
  } = req.body;

  // Check for user email
  const user = await User.findOne({
    email
  });

  // Check password
  if (user && (await bcrypt.compare(password, user.password))) {

    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: token,
      // We will generate and add a JWT token here in the next step
    });
  } else {
    res.status(401); // 401 Unauthorized
    throw new Error('Invalid email or password');
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  res.json(req.user);
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
};