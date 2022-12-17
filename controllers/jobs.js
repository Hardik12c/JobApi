
const getalljobs=async(req,res)=>{
    res.send("alljobssent");
}

const getjob=async(req,res)=>{
    res.send("job sent");
}
const createjob=async(req,res)=>{
    res.send("jobcreated");
}

const updatejob=async(req,res)=>{
    res.send("job updated");
}

const deletejob=async(req,res)=>{
    res.send("job deleted");
}

module.exports={
    getalljobs,
    getjob,
    createjob,
    updatejob,
    deletejob,
}