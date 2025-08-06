import db from "../config/db.js";

export const findStudentByCollegeId = async (college_id) => {
  const [rows] = await db.execute(
    `SELECT 
       s.college_id,
       s.student_name,
       s.contact_no,
       s.profile_url,
       u.email
     FROM students s
     JOIN users u ON s.college_id = u.college_id
     WHERE s.college_id = ?`,
    [college_id]
  );
  return rows;
};

