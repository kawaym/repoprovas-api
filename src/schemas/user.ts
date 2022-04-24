import Joi from "joi";

const user = Joi.object({
  user: {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  },
});

export default user;
