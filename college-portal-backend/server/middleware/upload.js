import multer from "multer";
import fs from "fs";
import path from "path";

// Uploads go directly into /uploads/profiles/
const baseProfileDir = path.join('uploads', 'profiles');

// Ensure base directory exists
if (!fs.existsSync(baseProfileDir)) {
  fs.mkdirSync(baseProfileDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, baseProfileDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${req.user.college_id}${ext}`;
    cb(null, uniqueName);
  }
});

// Upload middleware
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  }
});

// Delete old profile picture
export const removeFile = (filename) => {
  const filePath = path.join(baseProfileDir, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);
    } else {
      console.log("File deleted successfully:", filename);
    }
  });
};
