import db from "../config/db.js";

export const findAdminByCollegeId = async (college_id) => {
  const [rows] = await db.execute(
    `SELECT 
       a.college_id,
       a.admin_name,
       a.contact_no,
       a.profile_url,
       u.email
     FROM admin a
     JOIN users u ON a.college_id = u.college_id
     WHERE a.college_id = ?`,
    [college_id]
  );
  return rows;
};

