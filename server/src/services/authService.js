const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');
const { AppError } = require('../utils/appError');

const signToken = (userId, role) => {
  return jwt.sign({ userId, role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

const register = async (payload) => {
  const existing = await User.findOne({ email: payload.email.toLowerCase() });
  if (existing) throw new AppError('Email already in use', 409);

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    password: hashedPassword,
    role: 'customer',
  });

  const token = signToken(user._id, user.role);
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

const login = async (payload) => {
  const user = await User.findOne({ email: payload.email.toLowerCase() });
  if (!user || !user.isActive) throw new AppError('Invalid credentials', 401);

  const isValid = await bcrypt.compare(payload.password, user.password);
  if (!isValid) throw new AppError('Invalid credentials', 401);

  const token = signToken(user._id, user.role);
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
};

module.exports = { register, login };
