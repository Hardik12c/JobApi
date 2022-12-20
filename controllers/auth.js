const {StatusCodes}=require('http-status-codes');
const Userschema=require('../models/User');
// const BadRequestError=require('../errors/bad-request');


const register=async(req,res)=>{
    try {
        const user=await Userschema.create({...req.body});
        res.status(StatusCodes.CREATED).json({user});
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const login=async(req,res)=>{
    res.send("login successfully");
}

module.exports={register,login};