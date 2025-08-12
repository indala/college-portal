import bcrypt from 'bcryptjs'; // bcryptjs preferred for consistency & speed
import nodemailer from 'nodemailer';
import generateToken from '../utils/generateToken.js';
import {
  getUserById,
  getParentByStudentId,
  saveOtp,
  findOtp,
  deleteOtp,
  updatePassword,
  getUserByIdOrEmail
} from '../models/authModel.js';
import { getRoleIdByName } from '../models/roleModel.js';

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Parent login handler
 */
const loginParent = async (studentId, contact) => {
  const parent = await getParentByStudentId(studentId);
  if (!parent) {
    return { status: 404, message: 'Parent record not found' };
  }

  if (parent.contact_no !== contact) {
    return { status: 401, message: 'Invalid contact number' };
  }

  const student = await getUserById(studentId);
  if (!student) {
    return { status: 404, message: 'Linked student not found' };
  }

  const token = generateToken(studentId, 'Parent');
  return { status: 200, message: 'Parent login successful', token };
};

/**
 * User login handler for all roles except Parent
 */
const loginUser = async (id, password, role) => {
  const user = await getUserById(id);
  if (!user) {
    return { status: 404, message: 'User not found' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return { status: 401, message: 'Invalid password' };
  }

  const expectedRoleId = await getRoleIdByName(role);
  if (!expectedRoleId) {
    return { status: 400, message: 'Invalid role specified' };
  }
  if (user.role_id !== expectedRoleId) {
    return { status: 403, message: 'Role mismatch for this ID' };
  }

  const token = generateToken(user.college_id, role);
  return { status: 200, message: `${role} login successful`, token };
};

/**
 * Main login controller
 */
export const login = async (req, res) => {
  const { role, id, password, contact } = req.body;

  try {
    let result;

    if (role === 'Parent') {
      if (!id || !contact) {
        return res.status(400).json({ message: 'Student ID and contact required for Parent login' });
      }
      result = await loginParent(id, contact);
    } else {
      if (!id || !password) {
        return res.status(400).json({ message: 'ID and password required' });
      }
      result = await loginUser(id, password, role);
    }

    if (result.status !== 200) {
      return res.status(result.status).json({ message: result.message });
    }

    return res.json({ message: result.message, token: result.token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Send OTP for password reset
 */
export const sendOtp = async (req, res) => {
  const { identifier } = req.body;

  try {
    // Fetch user by either college_id or email
    const user = await getUserByIdOrEmail(identifier);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete existing OTP(s) for this user before saving new one
    await deleteOtp(user.college_id);


    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
console.log(expiresAt)
    // Use the actual college_id from the user record
    await saveOtp(user.college_id, otp, expiresAt);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

/**
 * Verify OTP & reset password
 */
export const verifyOtpAndResetPassword = async (req, res) => {
  const { identifier, otp, newPassword } = req.body;

  try {
    // First find the user to get college_id
    const user = await getUserByIdOrEmail(identifier);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate OTP against user.college_id
    const otpRecord = await findOtp(user.college_id, otp);
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updated = await updatePassword(user.college_id, hashedPassword);
    if (!updated) {
      return res.status(404).json({ message: 'User not found for password update' });
    }

    await deleteOtp(user.college_id);

    res.json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    console.error('Error resetting password:', err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};
