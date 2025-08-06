import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getFacultyInfo } from '../controllers/facultyController.js'; 

import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';


const facultyRoutes = express.Router();

facultyRoutes.get('/faculty/:college_id', verifyToken, getFacultyInfo);
facultyRoutes.put('/faculty/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default facultyRoutes ;
