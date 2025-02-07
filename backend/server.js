import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';

const app = express();
const port = process.env.PORT || 5000;
connectDb();
connectCloudinary();

app.use(express.json());
app.use(cors());

// api-endpoints
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
  res.send('Hello !');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
