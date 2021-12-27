import Joi from "joi";

export const CreateUserValidSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().alphanum().required(),
    name: Joi.string().trim().min(1).max(30).required(),
    birthday_year: Joi.number().integer().required(),
    birthday_month: Joi.number().integer().required(),
    birthday_day: Joi.number().integer().required(),
    gender: Joi.number().integer().less(2).required(),
    age: Joi.number().integer(),
    phone_number: Joi.string().trim().required(),
    join_date: Joi.string().trim().required()
});

export const PasswordValidSchema = Joi.object({
    id: Joi.number().optional(),
    password: Joi.string().trim().min(8).max(20).alphanum().optional(),
    newPassword: Joi.string().trim().min(8).max(20).alphanum()
});

export const loginValidSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
});

export const updateUserValidSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().trim().min(1).max(30).required(),
    birthday_year: Joi.number().integer().required(),
    birthday_month: Joi.number().integer().required(),
    birthday_day: Joi.number().integer().required(),
    gender: Joi.number().integer().less(2).required(),
    phone_number: Joi.string().trim().required(),
    age: Joi.number().integer()
});