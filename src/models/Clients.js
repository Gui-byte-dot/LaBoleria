import joi from 'joi';

export const clientSchema = joi.object({
    name:joi.required(),
    address:joi.required(),
    phone:joi.string().min(10).max(11).required(),

})