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

import amqplib from 'amqplib';

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();

  setInterval(async () => {
    try {
      console.log('Publishing');
      const exchange = 'user.signed_up';
      const queue = 'user.sign_up_email';
      const routingKey = 'sign_up_email';

      await channel.assertExchange(exchange, 'direct', { durable: true });
      await channel.assertQueue(queue, { durable: true });
      await channel.bindQueue(queue, exchange, routingKey);

      const msg = {
        id: Math.floor(Math.random() * 1000),
        email: 'blurryfacebeat@gmail.com',
        name: 'Vyacheslav Morozov'
      };
      await channel.publish(
        exchange,
        routingKey,
        Buffer.from(JSON.stringify(msg))
      );
      console.log('Message published');
    } catch (e) {
      console.error('Error in publishing message', e);
    }
  }, 10000);
})();
