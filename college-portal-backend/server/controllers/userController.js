import path from 'path';
import { removeFile } from '../middleware/upload.js';
import { updateUserProfileUrl, getUserProfileUrl } from '../models/userModel.js';

export const uploadProfilePicture = async (req, res) => {
  try {
    const collegeId = req.user.college_id;
    const roleName = req.user.role?.toLowerCase(); 
    const fileName = req.file.filename;
    const fileUrl = `/uploads/profiles/${fileName}`;

    const oldProfileUrl = await getUserProfileUrl(roleName, collegeId);
    const oldFileName = oldProfileUrl ? path.basename(oldProfileUrl) : null;

    await updateUserProfileUrl(roleName, collegeId, fileUrl);

    if (oldFileName && oldFileName !== fileName) {
      removeFile(oldFileName);
    }

    return res.status(200).json({
      message: 'Profile uploaded successfully',
      profile_url: fileUrl,
    });
  } catch (err) {
    console.error('Profile upload error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
