const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');


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
userschema.pre('save',async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next()
})
module.exports=mongoose.model('User',userschema);