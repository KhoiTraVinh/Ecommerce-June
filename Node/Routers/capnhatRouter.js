import multer from 'multer';
import express from 'express';
import { isAuth } from '../utils.js';

const capnhatRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.png`);
  },
});

const upload = multer({ storage });

capnhatRouter.post('/', isAuth, upload.single('hinhanh'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default capnhatRouter;