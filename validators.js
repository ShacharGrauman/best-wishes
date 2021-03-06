const yup = require('yup');

const loginScheme = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().matches(/\w{6,}$/).required()
});

const userScheme = yup.object().shape({
    username: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup.string().matches(/\w{6,}$/).required()
});

const eventScheme = yup.object().shape({
    title: yup.string().min(2).required(),
    category: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().when('startDate', (st, schema) => {
        return yup.date().min(st);
    }),
    location: yup.string().min(2).required()
});

const wishScheme = yup.object().shape({
    from: yup.string().min(2).required(),
    body: yup.string().min(2).required(),
    image: yup.string()
});

const validateLogin = async user => await loginScheme.isValid(user);

const validateNewUser = async user => await userScheme.isValid(user);

const validateEvent = async event => await eventScheme.isValid(event); 

const validateWish = async wish => await wishScheme.isValid(wish); 

module.exports = {
    validateLogin,
    validateNewUser,
    validateEvent,
    validateWish
}