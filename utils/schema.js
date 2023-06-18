const joi = require("joi");
module.exports = {
  UserSchema: {
    register: joi.object({
      name: joi.string().required().max(30),
      phone: joi.number().min(9).max(11).required(),
      points: joi.number().required(),
      address: joi.string().required().max(50),
      password: joi.string().required().min(6).max(30),
    }),
    login: joi.object({
      phone: joi.number().min(9).max(11),
      password: joi.string().required().min(6).max(30),
    }),
  },
  CategorySchema: joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    user: joi.optional(),
  }),
  ProductSchema: joi.object({
    name: joi.string().required().max(50),
    model: joi.string().required().max(50),
    price: joi.number().required().max(10),
    licence: joi.boolean().required(),
    description: joi.string().required(),
    categoryId: joi.string().required(),
    images: joi.string().required(),
  }),
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
