import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv/config';
import connectDB from './config/db';
import router from './src/routes';

const PORT = process.env.PORT || 3000;

// connectDB();

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log('Server Running on', PORT);
});
