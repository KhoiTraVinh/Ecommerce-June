import express from 'express';
import data from '../data1.js';
import User from '../Models/userModels.js';
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs';
import {generateToken} from '../utils.js'
import {isAuth, isAdmin} from '../utils.js'

const userRouter = express.Router();

userRouter.get('/seed',expressAsyncHandler(async (req, res) => {
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/dangnhap', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Sai Tai Khoan Hoac Mat Khau'});
}));

userRouter.post('/dangki', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    });
    const createdUsers = await user.save();
    res.send({
        _id: createdUsers._id,
        name: createdUsers.name,
        email: createdUsers.email,
        isAdmin: createdUsers.isAdmin,
        token: generateToken(createdUsers),
    })
}))

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    }else{
        res.status(404).send({message: 'Khong tim thay nguoi dung'});
    }
}))

userRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    }
}))

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = req.body.isSeller || user.isSeller;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const capnhattaikhoan = await user.save();
      res.send({ message: 'Cap Nhat Tai Khoan', user: capnhattaikhoan });
    } else {
      res.status(404).send({ message: 'Khong Tim Thay Tai Khoan' });
    }
  })
);


userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'thienkhoiduong@gmail.com') {
        res.status(400).send({ message: 'Khong the xoa tai khoan admin' });
        return;
      }
      const XoaTaiKhoan = await user.remove();
      res.send({ message: 'Da Xoa Tai khoan', user: XoaTaiKhoan });
    } else {
      res.status(404).send({ message: 'Khong Tim Thay Tai Khoan' });
    }
  })
);

export default userRouter