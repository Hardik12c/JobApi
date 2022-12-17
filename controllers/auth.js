
const register=async(req,res)=>{
    res.send("registered successfully");
}

const login=async(req,res)=>{
    res.send("login successfully");
}

module.exports={register,login};