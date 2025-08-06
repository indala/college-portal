import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getAdminInfo } from '../controllers/adminController.js'; 

import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';


const adminRoutes = express.Router();

adminRoutes.get('/admin/:college_id', verifyToken, getAdminInfo);
adminRoutes.put('/admin/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default adminRoutes ;
