import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getManagerInfo } from '../controllers/managerController.js';
import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';


const managerRoutes = express.Router();

managerRoutes.get('/manager/:college_id', verifyToken, getManagerInfo);
managerRoutes.put('/manager/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default managerRoutes ;
