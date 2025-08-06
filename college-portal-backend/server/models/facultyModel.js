import db from "../config/db.js";

export const findFacultyByCollegeId = async (college_id) => {
  const [rows] = await db.execute(
    `SELECT 
       f.college_id,
       f.faculty_name,
       f.contact_no,
       f.profile_url,
       u.email
     FROM faculty f
     JOIN users u ON f.college_id = u.college_id
     WHERE f.college_id = ?`,
    [college_id]
  );
  return rows;
};

