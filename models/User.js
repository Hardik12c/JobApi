const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide name'],
        minLength:3,
        trim:true,
        maxLength:30
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'Please provide valid email']
    },
    password:{
        type:String,
        required:[true,'Please provide the password'],
        minLength:6,
    }
})
userschema.pre('save',async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
userschema.methods.createJWT=function(){
    return jwt.sign({userId:this._id,name:this.name},process.env.JWT_KEY,{expiresIn:process.env.JWT_LIFETIME});
}
userschema.methods.comparepasswords= async function(checkpass){
    const ismatch=await bcrypt.compare(checkpass,this.password);
    return ismatch;
}
module.exports=mongoose.model('User',userschema);