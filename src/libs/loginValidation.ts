import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')).required().messages({
    'string.pattern.base': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.empty': 'Password is required',
  })
});