const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isResume = /pdf|doc|docx/.test(file.mimetype);
    const isVideo = /^video\//.test(file.mimetype);

    if (isVideo) {
      return {
        folder: 'sbs-videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'mov', 'webm', 'avi', 'mkv'],
      };
    }

    return {
      folder: isResume ? 'sbs-resumes' : 'sbs-logos',
      resource_type: isResume ? 'raw' : 'image',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'doc', 'docx'],
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif|webp|pdf|doc|docx|mp4|mov|webm|avi|mkv|quicktime/;
  const ext = allowed.test(file.originalname.toLowerCase()) || allowed.test(file.mimetype);
  if (ext) cb(null, true);
  else cb(new Error('Only images, PDF/DOC/DOCX, or video files are allowed'));
};

const upload = multer({
  storage,
  fileFilter,
  // Cloudinary's free plan caps video uploads at 100MB; staying at 95MB
  // leaves a safety margin against byte-rounding at the boundary.
  limits: { fileSize: 95 * 1024 * 1024 },
});

module.exports = upload;