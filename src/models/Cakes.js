import joi from 'joi';

export const cakeSchema = joi.object({
    name:joi.string().required(),
    price:joi.number().min(0).required(),
    description:joi.string().required(),
    image:joi.string().required()
    
})