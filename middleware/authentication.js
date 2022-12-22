const jwt = require('jsonwebtoken');
const{UnauthenticatedError}=require('../errors');
const auth=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader || !authheader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Failed');
    }   
    const token=authheader.split(' ')[1];
    try {
        const decoded=jwt.verify(token,process.env.JWT_KEY)
        req.user = { userId: decoded.userId, name: decoded.name }
        next()    
    } catch (error) {
        throw new UnauthenticatedError('Authentication Failed');        
    }
}
module.exports=auth;