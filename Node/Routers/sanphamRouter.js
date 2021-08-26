import express from 'express';
import data from '../data1.js';
import Sanpham from '../Models/sanphamModels.js';
import expressAsyncHandler from 'express-async-handler';
import {isAuth, isAdmin} from '../utils.js';

const sanphamRouter = express.Router();

sanphamRouter.get('/', expressAsyncHandler(async (req, res) => {
    const sanphams = await Sanpham.find({});
    res.send(sanphams)
}))

sanphamRouter.get('/seed', expressAsyncHandler(async(req, res) => {
    const createdSanphams = await Sanpham.insertMany(data.sanphams);
    res.send({ createdSanphams });
}));

sanphamRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const sanpham = await Sanpham.findById(req.params.id);
    if(sanpham){
        res.send(sanpham)
    }else{
        res.status(404).send({message: 'Khong tin thay san pham'});
    }
}));
sanphamRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sanpham = new Sanpham({
      ten: 'khoi test ' + Date.now(),
      hinhanh: '/images/p1.png',
      gia: 0,
      loai: 'loai test',
      thuonghieu: 'thuong hieu test',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      mota: 'cai nay de test',
    });
    const TaoSanPham = await sanpham.save();
    res.send({ message: 'sanpham Created', sanpham: TaoSanPham });
  })
);
sanphamRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sanphamId = req.params.id;
    const sanpham = await Sanpham.findById(sanphamId);
    if (sanpham) {
      sanpham.ten = req.body.name;
      sanpham.gia = req.body.price;
      sanpham.hinhanh = req.body.hinhanh;
      sanpham.loai = req.body.category;
      sanpham.thuonghieu = req.body.brand;
      sanpham.countInStock = req.body.countInStock;
      sanpham.mota = req.body.description;
      const capnhatsanpham = await sanpham.save();
      res.send({ message: 'cap nhat san pham', sanpham: capnhatsanpham });
    } else {
      res.status(404).send({ message: 'khong tim thay sanpham' });
    }
  })
);

sanphamRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const sanpham = await Sanpham.findById(req.params.id);
    if (sanpham) {
      const xoasanpham = await sanpham.remove();
      res.send({ message: 'da xoa sanpham', sanpham: xoasanpham });
    } else {
      res.status(404).send({ message: 'khong tim thay sanpham' });
    }
  })
);

sanphamRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const sanphamId = req.params.id;
    const sanpham = await Sanpham.findById(sanphamId);
    if (sanpham) {
      if (sanpham.reviews.find((x) => x.ten === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'Ban Da Dang mot review' });
      }
      const review = {
        ten: req.user.name,
        rating: Number(req.body.rating),
        binhluan: req.body.binhluan,
      };
      sanpham.reviews.push(review);
      sanpham.numReviews = sanpham.reviews.length;
      sanpham.rating =
        sanpham.reviews.reduce((a, c) => c.rating + a, 0) /
        sanpham.reviews.length;
      const capnhatsanpham = await sanpham.save();
      res.status(201).send({
        message: 'Da Tao Review',
        review: capnhatsanpham.reviews[capnhatsanpham.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Khong Tim Thay San Pham' });
    }
  })
);


export default sanphamRouter;
