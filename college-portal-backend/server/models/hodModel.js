import db from "../config/db.js";

export const findHODByCollegeId = async (college_id) => {
  const [rows] = await db.execute(
    `SELECT 
       h.college_id,
       h.hod_name,
       h.contact_no,
       h.profile_url,
       u.email
     FROM hod h
     JOIN users u ON h.college_id = u.college_id
     WHERE h.college_id = ?`,
    [college_id]
  );
  return rows;
};
