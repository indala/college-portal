// controllers/parentController.js
import { getParentByStudentId, getStudentDetails } from '../models/authModel.js';

export const getParentInfo = async (req, res) => {
  try {
    const studentIdFromParams = req.params.student_id;
    const studentIdFromToken = req.user.college_id;

    if (studentIdFromParams !== studentIdFromToken) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const parent = await getParentByStudentId(studentIdFromParams);
    const student = await getStudentDetails(studentIdFromParams);

    if (!parent || !student) {
      return res.status(404).json({ message: 'Parent or student info not found' });
    }

    return res.status(200).json({
      college_id: student.college_id,
      parent_name: parent.parent_name,
      contact_no: parent.contact_no,
      profile_url: parent.profile_url,
      student_name: student.student_name,
      email: student.email,
    });
  } catch (err) {
    console.error('Error fetching parent info:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
