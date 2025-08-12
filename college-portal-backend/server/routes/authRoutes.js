import express from 'express';
import { login, sendOtp, verifyOtpAndResetPassword } from '../controllers/authController.js';


const authRoutes = express.Router();

authRoutes.post('/login', login);
authRoutes.post('/send-otp', sendOtp);
authRoutes.post('/verify-otp', verifyOtpAndResetPassword);

export default authRoutes;
