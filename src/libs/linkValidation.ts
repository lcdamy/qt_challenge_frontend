import Joi from 'joi';

export const longUrlSchema = Joi.object({
  longUrl: Joi.string().uri().required().messages({
    'string.uri': 'URL must be a valid URL',
    'string.empty': 'URL is required',
  }),
});