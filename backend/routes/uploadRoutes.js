import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp|jfif/;
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jfif",
  ];

  const ext = path.extname(file.originalname).slice(1).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(ext) && allowedMimeTypes.includes(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only (.jpeg, .jpg, .png, .webp)"), false);
  }
};



const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
});

const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      res.status(200).send({
        message: "Image uploaded successfully",
        image: `/${req.file.path}`,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
