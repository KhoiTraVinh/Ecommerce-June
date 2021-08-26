import DonHang from '../Models/donhangModels.js';
import expressAsyncHandler from 'express-async-handler'
import express from 'express';
import {isAuth, isAdmin, mailgun, payOrderEmailTemplate} from '../utils.js';
import User from '../Models/userModels.js';
import Sanpham from '../Models/sanphamModels.js';

const donhangRouter = express.Router();



donhangRouter.get(
  '/thongke',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await DonHang.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await DonHang.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Sanpham.aggregate([
      {
        $group: {
          _id: '$loai',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

donhangRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const donhangs = await DonHang.find({}).populate('user', 'ten');
    res.send(donhangs);
  })
);

donhangRouter.get('/mine', isAuth, expressAsyncHandler(async(req, res) =>{
    const donhangs = await DonHang.find({user: req.user._id});
    res.send(donhangs);
}));

donhangRouter.post('/',isAuth, expressAsyncHandler(async (req, res) => {
    if(req.body.ChiTietDonHang.length === 0) {
        res.status(400).send({message: 'Gio Hang Rong'});
    }
    else {
        const donhang = new DonHang({
            ChiTietDonHang: req.body.ChiTietDonHang,
            ThongTinGiaoHang: req.body.ThongTinGiaoHang,
            PhuongThucThanhToan: req.body.PhuongThucThanhToan,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdDonHang = await donhang.save();
        res.status(201).send({message: 'Da Tao Don Hang Moi', donhang: createdDonHang })
    }
}));

donhangRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const donhang = await DonHang.findById(req.params.id);
    if(donhang) {
        res.send(donhang);
    }else{
        res.status(404).send({message: 'Khong tim thay don hang'});
    }
})
);

donhangRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const donhang = await DonHang.findById(req.params.id).populate(
      'user',
      'email name'
    );
    if(donhang) {
        donhang.isPaid = true;
        donhang.paidAt = Date.now();
        donhang.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };
        const capnhatdonhang = await donhang.save();
        mailgun()
        .messages()
        .send(
          {
            from: 'KhoiDepTrai <thienkhoiduong@gmail.com>',
            to: `${donhang.ThongTinGiaoHang.name} <${donhang.ThongTinGiaoHang.email}>`,
            subject: `Don Hang Moi ${donhang._id}`,
            html: payOrderEmailTemplate(donhang),
          },
          (error, body) => {
            if (error) {
              console.log(error);
            } else {
              console.log(body);
            }
          }
        );
        res.send({message: 'Don Hang Da Thanh Toan', donhang:capnhatdonhang});
    }else{
        res.status(404).send({message: 'Khong Tim Thay Don Hang'})
    }
}))

donhangRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const donhang = await DonHang.findById(req.params.id);
    if (donhang) {
      const xoadonhang = await donhang.remove();
      res.send({ message: 'Da Xoa Don Hang', donhang: xoadonhang });
    } else {
      res.status(404).send({ message: 'Khong Tim Thay Don Hang' });
    }
  })
);

donhangRouter.put(
  '/:id/giaohang',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const donhang = await DonHang.findById(req.params.id);
    if (donhang) {
      donhang.isDelivered = true;
      donhang.deliveredAt = Date.now();

      const capnhatdonhang1 = await donhang.save();
      res.send({ message: 'donhang da giao', donhang: capnhatdonhang1 });
    } else {
      res.status(404).send({ message: 'khong tin thay don hang' });
    }
  })
);



export default donhangRouter;