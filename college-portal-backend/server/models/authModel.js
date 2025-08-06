import db from '../config/db.js';


 export const getUserById = async (college_id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE college_id = ?', [college_id]);
  return rows[0];
};

export const getStudentDetails = async (college_id) => {
  const [rows] = await db.query('SELECT * FROM students WHERE college_id = ?', [college_id]);
  return rows[0];
};

export const getFacultyDetails = async (faculty_id) => {
  const [rows] = await db.query('SELECT * FROM faculty WHERE id = ?', [faculty_id]);
  return rows[0];
};

export const getParentByStudentId = async (student_id) => {
  const [rows] = await db.query('SELECT * FROM parents WHERE student_id = ?', [student_id]);
  return rows[0];
};

