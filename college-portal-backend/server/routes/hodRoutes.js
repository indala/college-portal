import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getHODInfo } from '../controllers/hodController.js';
import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';


const hodRoutes = express.Router();

hodRoutes.get('/hod/:college_id', verifyToken, getHODInfo);
hodRoutes.put('/hod/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default hodRoutes ;
