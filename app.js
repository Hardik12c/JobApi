require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// connectdb
const connectDB=require('./db/connect');
const authenticateuser=require('./middleware/authentication');

// routers
const authrouter=require('./routes/auth');
const jobrouter=require('./routes/jobs');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());

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
