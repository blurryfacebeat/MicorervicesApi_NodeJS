import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bookRouter from './router/bookRouter.js';


dotenv.config();
const PORT = process.env.PORT || 3001;
const DB_URL = process.env.DB_URL;

const app = express();
app.use(express.json());
app.use('/book', bookRouter);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    app.listen(PORT, () => {
      console.log(`Server 2 started in ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
