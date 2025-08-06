import db from "../config/db.js";

export const findManagerByCollegeId = async (college_id) => {
  const [rows] = await db.execute(
    `SELECT 
       m.college_id,
       m.manager_name,
       m.contact_no,
       m.profile_url,
       u.email
     FROM manager m
     JOIN users u ON m.college_id = u.college_id
     WHERE m.college_id = ?`,
    [college_id]
  );
  return rows;
};
