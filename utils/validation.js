import Joi from 'joi';

// REGISTER VALIDATION
export const registerValidation = (params) => {

  const schema = Joi.object({
    userName: Joi.string().min(3).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).required(),
  });
  
  // DATA VALIDATION BEFORE WORKING WITH IT
  return (schema.validate(params));
};

export const loginValidation = (params) => {
  
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(6).required(),
  });

  // DATA VALIDATION BEFORE WORKING WITH IT
  return (schema.validate(params));
};
