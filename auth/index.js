import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './router/authRouter.js';
import axios from 'axios';

dotenv.config();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

let userLocationInfo = {};
const app = express();
app.use(express.json());
app.use('/auth', authRouter);

const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    app.listen(PORT, () => {
      console.log(`Server started in ${PORT}`);
      axios
        .get('http://ip-api.com/json')
        .then((res) => {
          userLocationInfo = res.data;
        })
        .catch((e) => {
          console.log(e.message);
        });
    });
  } catch (e) {
    console.log(e);
  }
};

startApp();
