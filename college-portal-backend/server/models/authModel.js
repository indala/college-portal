import db from '../config/db.js';

/* =====================
   USER & RELATED LOOKUPS
   ===================== */

/**
 * Find a user by college_id
 */
export const getUserById = async (college_id) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE college_id = ? LIMIT 1',
    [college_id]
  );
  return rows[0] || null;
};

/**
 * Get student details
 */
export const getStudentDetails = async (college_id) => {
  const [rows] = await db.query(
    'SELECT * FROM students WHERE college_id = ? LIMIT 1',
    [college_id]
  );
  return rows[0] || null;
};

/**
 * Get faculty details
 */
export const getFacultyDetails = async (faculty_id) => {
  const [rows] = await db.query(
    'SELECT * FROM faculty WHERE id = ? LIMIT 1',
    [faculty_id]
  );
  return rows[0] || null;
};

/**
 * Get parent by student_id
 */
export const getParentByStudentId = async (student_id) => {
  const [rows] = await db.query(
    'SELECT * FROM parents WHERE student_id = ? LIMIT 1',
    [student_id]
  );
  return rows[0] || null;
};
export const getUserByIdOrEmail = async (identifier) => {
  const isEmail = identifier.includes('@');
  const query = isEmail
    ? 'SELECT * FROM users WHERE email = ? LIMIT 1'
    : 'SELECT * FROM users WHERE college_id = ? LIMIT 1';

  const [rows] = await db.query(query, [identifier]);
  return rows[0] || null;
};

/* =====================
   PASSWORD RESET / OTP
   ===================== */

/**
 * Save or update OTP (expires_at handled in insert)
 */
export const saveOtp = async (college_id, otp, expiresAt) => {
  await db.query(
    `INSERT INTO password_resets (college_id, otp, expires_at)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE otp = VALUES(otp), expires_at = VALUES(expires_at)`,
    [college_id, otp, expiresAt]
  );
};

/**
 * Find OTP (valid only if not expired)
 */
export const findOtp = async (college_id, otp) => {
  const [rows] = await db.query(
    `SELECT * FROM password_resets
     WHERE college_id = ? AND otp = ? AND expires_at > NOW()
     LIMIT 1`,
    [college_id, otp]
  );
  return rows[0] || null;
};

/**
 * Delete OTP for given college_id
 */
export const deleteOtp = async (college_id) => {
  await db.query(
    'DELETE FROM password_resets WHERE college_id = ? LIMIT 1',
    [college_id]
  );
};

/**
 * Update user password by college_id
 */
export const updatePassword = async (college_id, hashedPassword) => {
  const [result] = await db.query(
    'UPDATE users SET password = ? WHERE college_id = ?',
    [hashedPassword, college_id]
  );
  return result.affectedRows > 0;
};

/**
 * Remove expired OTPs (optional, for cleanup)
 */
export const deleteExpiredOtps = async () => {
  await db.query(
    'DELETE FROM password_resets WHERE expires_at <= NOW()'
  );
};
