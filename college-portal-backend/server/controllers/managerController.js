import { findManagerByCollegeId } from "../models/managerModel.js";

export const getManagerInfo = async (req, res) => {
  try {
    const collegeIdFromParams = req.params.college_id;
    const collegeIdFromToken = req.user.college_id;

    if (collegeIdFromParams !== collegeIdFromToken) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const rows = await findManagerByCollegeId(collegeIdFromParams);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'HOD not found' });
    }
    
    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching HOD info:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
