import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { UserRouters } from './app/modules/user/user.route';
import { globalErrorHandaler } from './app/middleware/globalErrorHandaler';
import notFound from './app/middleware/notFound';
import { AuthRouters } from './app/modules/auth/auth.route';
import { router } from './app/routes';
import { envVars } from './config/env';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api", router )


app.get('/', (req, res) => {
  res.json({ message: 'Digital Wallet API is running!' });
});

// Database connection
mongoose.connect(envVars.DB_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${envVars.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });


app.use(globalErrorHandaler)

app.use(notFound)
