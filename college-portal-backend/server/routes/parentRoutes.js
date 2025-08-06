// routes/parentRoutes.js
import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getParentInfo } from '../controllers/parentController.js';
import { upload } from '../middleware/upload.js';
import { uploadProfilePicture } from '../controllers/userController.js';

const parentRoutes = express.Router();

parentRoutes.get('/parent/:student_id', verifyToken, getParentInfo);
parentRoutes.put('/parent/profile-picture', verifyToken, upload.single('profile'), uploadProfilePicture);

export default parentRoutes;
