const Joi = require('joi');

module.exports.listingschem=Joi.object({
    listings:Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        country:Joi.string().required(),
        location:Joi.string().required(),
        price:Joi.string().required().min(0),
        image:Joi.string().allow("",null),

       }).required()
})