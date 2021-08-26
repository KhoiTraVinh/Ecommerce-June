import jwt from 'jsonwebtoken'
import mg from 'mailgun-js';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '30d'
    });
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if(err){
                    res.status(401).send({ message: 'Token khong hop le'});
                }else
                {
                    req.user = decode;
                    next();
                }
            }
        );
    }else {
        res.status(401).send({ message: 'Khong co token'});
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    }else{
        res.status(401).send({ message: 'Khong co quyen admin'});
    }
};

export const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });

export const payOrderEmailTemplate = (order) => {
  return `<h1>Cam On Ban Da Mua Hang</h1>
  <p>
  Chao ${order.user.name},</p>
  <p>Chung Toi Can Ban Xac Nhan Don Hang</p>
  <h2>[Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})</h2>
  <table>
  <thead>
  <tr>
  <td><strong>San Pham</strong></td>
  <td><strong>So Luong</strong></td>
  <td><strong align="right">Gia</strong></td>
  </thead>
  <tbody>
  ${order.orderItems
    .map(
      (item) => `
    <tr>
    <td>${item.ten}</td>
    <td align="center">${item.sl}</td>
    <td align="right"> $${item.gia.toFixed(2)}</td>
    </tr>
  `
    )
    .join('\n')}
  </tbody>
  <tfoot>
  <tr>
  <td colspan="2">Chi Tiet Gia:</td>
  <td align="right"> $${order.itemsPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Thue:</td>
  <td align="right"> $${order.taxPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2">Phi Giao Hang:</td>
  <td align="right"> $${order.shippingPrice.toFixed(2)}</td>
  </tr>
  <tr>
  <td colspan="2"><strong>Tong Cong:</strong></td>
  <td align="right"><strong> $${order.totalPrice.toFixed(2)}</strong></td>
  </tr>
  <tr>
  <td colspan="2">Phuong Thuc Thanh Toan:</td>
  <td align="right">${order.paymentMethod}</td>
  </tr>
  </table>
  <h2>Thong Tin Giao Hang</h2>
  <p>
  ${order.ThongTinGiaoHang.hoten},<br/>
  ${order.ThongTinGiaoHang.diachi},<br/>
  ${order.ThongTinGiaoHang.phuong},<br/>
  ${order.ThongTinGiaoHang.quan},<br/>
  ${order.ThongTinGiaoHang.sodienthoai}<br/>
  </p>
  <hr/>
  <p>
  Cam on Nam Vu
  </p>
  `;
};
