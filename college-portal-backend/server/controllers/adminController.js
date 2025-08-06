import { findAdminByCollegeId } from "../models/adminModel.js";

export const getAdminInfo = async (req, res) => {
  try {
    const collegeIdFromParams = req.params.college_id;
    const collegeIdFromToken = req.user.college_id;

    if (collegeIdFromParams !== collegeIdFromToken) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const rows = await findAdminByCollegeId(collegeIdFromParams);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'admin not found' });
    }

    // Return full Faculty object (safe fields only)
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching Admin info:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

