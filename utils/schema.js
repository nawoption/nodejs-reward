const joi = require("joi");
module.exports = {
  UserSchema: {
    register: joi.object({
      name: joi.string().required().min(6).max(30),
      phone: joi.string().required().min(9).max(11),
      address: joi.string().required().min(5).max(50),
      email: joi.string().email().optional(),
      password: joi.string().required().min(6).max(30),
    }),
    login: joi.object({
      phone: joi.string().required().min(9).max(11),
      password: joi.string().required().min(6).max(30),
    }),
    changePassword: joi.object({
      oldPassword: joi.string().required().min(6).max(30),
      password: joi.string().required().min(6).max(30),
    }),
    updateProfile: joi.object({
      name: joi.string().required().min(6).max(30),
      address: joi.string().required().max(50),
      email: joi.string().email().optional(),
      phone:joi.string().optional()
    }),
  },
  PromotionSchema: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    startDate: joi.date().optional(),
    expireDate: joi.date().optional(),
  }),
  RewardSchema: joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    points: joi.number().required(),
  }),
};
