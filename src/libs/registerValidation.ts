import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'string.min': 'Username must be at least 3 characters',
    'string.empty': 'Username is required',
  }),
  email: Joi.string().pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')).required().messages({
    'string.pattern.base': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match password',
    'any.required': 'Confirm password is required',
  })
});
