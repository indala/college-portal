import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getStudentInfo } from '../controllers/studentController.js';
import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';


const studentRoutes = express.Router();

studentRoutes.get('/student/:college_id', verifyToken, getStudentInfo);
studentRoutes.put('/student/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default studentRoutes ;
