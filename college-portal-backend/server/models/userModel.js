import db from "../config/db.js";

const roleToTable = {
  student: 'students',
  faculty: 'faculty',
  admin: 'admin',
  manager: 'manager',
  lab_incharge: 'lab_incharge',
  hod: 'hod',
};

export const getUserProfileUrl = async (roleName, collegeId) => {
  const table = roleToTable[roleName];
  if (!table) throw new Error("Unsupported role for profile lookup");

  const [rows] = await db.execute(
    `SELECT profile_url FROM ${table} WHERE college_id = ?`,
    [collegeId]
  );
  return rows[0]?.profile_url || null;
};

export const updateUserProfileUrl = async (roleName, collegeId, profileUrl) => {
  const table = roleToTable[roleName];
  if (!table) throw new Error("Unsupported role for profile update");

  await db.execute(
    `UPDATE ${table} SET profile_url = ? WHERE college_id = ?`,
    [profileUrl, collegeId]
  );
};
