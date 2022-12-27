require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// security packages
const helmet=require('helmet');
const cors=require('cors');
const xss=require('xss-clean');
const ratelimiter=require('express-rate-limit');
// connectdb
const connectDB=require('./db/connect');
const authenticateuser=require('./middleware/authentication');

// routers
const authrouter=require('./routes/auth');
const jobrouter=require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy',1);
app.use(ratelimiter({
  windowMs:15*60*1000,
  max:100,
}));


app.use(express.json());


// using security packages

app.use(helmet());
app.use(cors());
app.use(xss()); 
// routes
app.use('/api/v1/auth',authrouter);

app.use('/api/v1/job',authenticateuser,jobrouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.connectionstring);
    app.listen(port, () =>
      console.log(`app listening on port http://localhost:${port}/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
