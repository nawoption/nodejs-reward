const joi = require("joi");
module.exports = {
  UserSchema: {
    register: joi.object({
      name: joi.string().required().max(30),
      phone: joi.number().required(),
      address: joi.string().required().max(50),
      email: joi.string().email().optional(),
      password: joi.string().required().min(6).max(30),
    }),
    login: joi.object({
      phone: joi.number().required(),
      password: joi.string().required().min(6).max(30),
    }),
  },
  PromotionSchema: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    startDate: joi.string().required(),
    expireDate: joi.string().required(),
  }),
  RewardSchema: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    points: joi.number().required(),
    expireDate: joi.string().required(),
  }),
};
