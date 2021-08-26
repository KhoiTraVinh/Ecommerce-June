import api from 'express';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import sanphamRouter from './Routers/sanphamRouter.js';
import donhangRouter from './Routers/donhangRouter.js';
import dotenv from 'dotenv';
import path from 'path';
import capnhatRouter from './Routers/capnhatRouter.js';


dotenv.config();

const app = api();
app.use(api.json());
app.use(api.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/kfc', {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/uploads', capnhatRouter);
app.use('/api/users', userRouter);
app.use('/api/sanpham', sanphamRouter);
app.use('/api/donhangs', donhangRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});
const __dirname = path.resolve();
app.use('/uploads', api.static(path.join(__dirname, '/uploads')));
app.use(api.static(path.join(__dirname, '/project1/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/project1/build/index.html'))
);
//app.get('/', (req, res) => {
//    res.send('khoine');
//});
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`${port}`)
});