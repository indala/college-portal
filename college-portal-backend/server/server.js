import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import parentRoutes from './routes/parentRoutes.js';
import hodRoutes from './routes/hodRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import managerRoutes from './routes/managerRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",studentRoutes);
app.use('/api', authRoutes);
app.use('/api',facultyRoutes);
app.use("/api",parentRoutes);
app.use("/api",hodRoutes);
app.use("/api",adminRoutes);
app.use("/api",managerRoutes);
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
