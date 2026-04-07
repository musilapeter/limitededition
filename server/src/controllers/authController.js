const { asyncHandler } = require('../utils/asyncHandler');
const { sendSuccess } = require('../utils/apiResponse');
const authService = require('../services/authService');

const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  return sendSuccess(res, { statusCode: 201, message: 'Registration successful', data });
});

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return sendSuccess(res, { message: 'Login successful', data });
});

const me = asyncHandler(async (req, res) => {
  return sendSuccess(res, {
    message: 'Current user fetched',
    data: {
      user: req.user,
    },
  });
});

module.exports = { register, login, me };
