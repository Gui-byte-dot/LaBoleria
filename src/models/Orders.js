import joi from 'joi';

export const orderSchema = joi.object({
    clientId:joi.number().required(),
    cakeId:joi.number().required(),
    createdAt:joi.string(),
    quantity:joi.number().min(1).max(4).required(),
    totalPrice:joi.number()
})