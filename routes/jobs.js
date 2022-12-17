const express=require('express');

const {getalljobs,getjob,createjob,updatejob,deletejob}=require('../controllers/jobs');

const router=express.Router();

router.route('/').get(getalljobs).post(createjob);

router.route('/:id').get(getjob).patch(updatejob).delete(deletejob);

module.exports=router;