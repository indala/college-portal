import db from "../config/db.js";

// Get role ID from role name
export const getRoleIdByName = async (roleName) => {
  const [rows] = await db.query('SELECT id FROM roles WHERE name = ?', [roleName]);
  return rows.length > 0 ? rows[0].id : null;
};
