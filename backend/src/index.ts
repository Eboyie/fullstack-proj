import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { productRouter } from './router/productRouter';
import { fillRouter } from './router/fillRouter';
import { userRouter } from './router/userRouter';
import { orderRouter } from './router/orderRouter';
import { keyRouter } from './router/keyRouter';

dotenv.config();

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost/uniquestore';
mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch(() => {
    console.log('error mongodb');
  });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/fill', fillRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/keys', keyRouter);

const PORT = process.env.PORT || 4090;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
