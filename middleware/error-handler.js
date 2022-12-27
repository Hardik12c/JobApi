const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customerror={
    status:err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
    messg:err.message||"Something went wrong Please try again"
  }
  if(err.name==="ValidationError"){     
    customerror.messg=((Object.values(err.errors)).map((e)=>e.message)).join(',');
    customerror.status=400;
  }
  if(err.name==="CastError"){     
    customerror.messg=`No item found with id : ${err.value}`;
    customerror.status=404;
  }
  if(err.code && err.code==11000){
    customerror.messg=`Duplicate value entered for ${Object.keys(err.keyValue)} Please enter a fresh value`;
    customerror.status=400;
  }
  // return res.status(customerror.status).json({err});
  return res.status(customerror.status).json({messg:customerror.messg});
}

module.exports = errorHandlerMiddleware
