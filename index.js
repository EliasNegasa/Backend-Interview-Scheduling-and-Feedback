import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config';
import connectDB from './config/db';
import router from './src/routes';
import { errorHandler, notFound } from './src/middlewares/error';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server Running on', PORT);
});
