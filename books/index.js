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

import amqplib from 'amqplib';

const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

async function processMessage(msg) {
  console.log(msg.content.toString(), 'Call email API here');
}

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  channel.prefetch(10);
  const queue = 'user.sign_up_email';
  process.once('SIGINT', async () => {
    console.log('got sigint, closing connection');
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(
    queue,
    async (msg) => {
      console.log('processing messages');
      await processMessage(msg);
      await channel.ack(msg);
    },
    {
      noAck: false,
      consumerTag: 'email_consumer'
    }
  );
  console.log(' [*] Waiting for messages. To exit press CTRL+C');
})();
