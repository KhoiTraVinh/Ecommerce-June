import React,{useEffect} from 'react'
import {TAYTRANG_DONHANG} from '../constants/DonHangConstants'
import CheckOut from '../components/CheckOut'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {TaoDonHang} from '../actions/DonHangActions';
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'


export default function DonHang(props) {
    const giohang = useSelector((state) => state.GioHang);
    if(!giohang.PhuongThucThanhToan)
    {
        props.history.push('/thanhtoan');
    }
    const taodonhang = useSelector((state) => state.DonHang)
    const {loading, success, error, donhang} = taodonhang
    const toPrice = (num) => Number(num.toFixed(2));
    giohang.itemsPrice = toPrice(
        giohang.ChiTietDonHang.reduce((a, c) => a + c.sl * c.gia, 0)
    );
    giohang.shippingPrice = giohang.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    giohang.taxPrice = toPrice(0.1*giohang.itemsPrice);
    giohang.totalPrice = giohang.itemsPrice + giohang.shippingPrice + giohang.taxPrice;
    const dispatch = useDispatch();
    const TraTienne=() => {
        dispatch(TaoDonHang({ ...giohang, ChiTietDonHang: giohang.ChiTietDonHang}))
    }
    useEffect(() => {
        if(success) {
            props.history.push(`/chitietdonhang/${donhang._id}`);
            dispatch({type: TAYTRANG_DONHANG});
        }
    },[dispatch, donhang, props.history, success])
    return (
        <div>
            <CheckOut step1 step2 step3 step4></CheckOut>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Giao Hang</h2>
                                <p>
                                    <strong>Ho Ten:</strong>{giohang.ThongTinGiaoHang.hoten} <br/>
                                    <strong>Dia Chi:</strong>{giohang.ThongTinGiaoHang.diachi}, {giohang.ThongTinGiaoHang.phuong}
                                    , {giohang.ThongTinGiaoHang.quan} <br/>
                                    <strong>So Dien Thoai:</strong>{giohang.ThongTinGiaoHang.sodienthoai}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Thanh Toan</h2>
                                <p>
                                    <strong>PhuongThuc:</strong>{giohang.PhuongThucThanhToan}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Chi Tiet Don Hang</h2>
                                <ul>
                                    {giohang.ChiTietDonHang.map((chitiet) => (
                                        <li key={chitiet.sanpham}>
                                            <div className="row">
                                                <div>
                                                    <img src={chitiet.hinhanh}
                                                    alt={chitiet.ten}
                                                    className="small"/>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/sanpham/${chitiet.sanpham}`}>{chitiet.ten}</Link>
                                                </div>
                                                <div>{chitiet.sl} x ${chitiet.gia} = ${chitiet.sl * chitiet.gia}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Tổng Cộng Đơn Hàng</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Khoine</div>
                                    <div>${giohang.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>GiaoHang</div>
                                    <div>${giohang.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Thue</div>
                                    <div>${giohang.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>TongCong</strong></div>
                                    <div><strong>${giohang.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="button" onClick={TraTienne} className="primary block" disabled={giohang.ChiTietDonHang.length === 0}>ThanhToan</button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
