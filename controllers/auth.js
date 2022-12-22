const { StatusCodes } = require('http-status-codes');
const Userschema = require('../models/User');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    try {
        const user = await Userschema.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }
    const user = await Userschema.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const checkpass=await user.comparepasswords(password);
    if(!checkpass){
        throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

module.exports = { register, login };