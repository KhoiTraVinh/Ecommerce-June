import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import {ChiTietsDonHang, ThanhToanDonHang, GiaoHang} from '../actions/DonHangActions'
import Axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import { TAYTRANG_THANHTOAN_DONHANG, GIAO_DONHANG_TAYTRANG } from '../constants/DonHangConstants'


export default function ChiTietDonHang(props) {
    const donhangId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false);
    const chitietdonhang = useSelector((state) => state.ChiTietDonHang);
    const {loading, error, donhang} = chitietdonhang
    const thanhtoandonhang = useSelector((state) => state.ThanhToanDonHang);
    const {loading: loadingPay, error: errorPay, success: successPay} = thanhtoandonhang
    const dangnhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang } = dangnhap;
    const giaohang = useSelector((state) => state.GiaoHang);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver,
    } = giaohang;
    const dispatch = useDispatch();
    useEffect(() => {
        const addPayPalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type='text/javascript';
            script.scr=`https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async=true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if(!donhang || successPay || successDeliver ||(donhang && donhang._id !== donhangId)) {
            dispatch({ type: TAYTRANG_THANHTOAN_DONHANG });
            dispatch({ type: GIAO_DONHANG_TAYTRANG });
            dispatch(ChiTietsDonHang(donhangId))
        }else {
            if(!donhang.isPaid){
                if(!window.paypal){
                    addPayPalScript();
                } else{
                    setSdkReady(true);
                }
            }
        }
    },[dispatch, donhangId, sdkReady, successPay, successDeliver, donhang])
    const thanhcongtratien = (paymentResult) => {
        dispatch(ThanhToanDonHang(donhang, paymentResult))
    }
    const GiaoHangne = () => {
        dispatch(GiaoHang(donhang._id));
    };
    return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
        <div>
            <h1>DonHang: {donhang._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Giao Hang</h2>
                                <p>
                                    <strong>Ho Ten:</strong>{donhang.ThongTinGiaoHang.hoten} <br/>
                                    <strong>Dia Chi:</strong>{donhang.ThongTinGiaoHang.diachi}, {donhang.ThongTinGiaoHang.phuong}
                                    , {donhang.ThongTinGiaoHang.quan} <br/>
                                    <strong>So Dien Thoai:</strong>{donhang.ThongTinGiaoHang.sodienthoai}
                                </p>
                                {donhang.isDelivered ? (
                                    <MessageBox variant="success">Giao Hang Luc {donhang.deliveredAt}</MessageBox>
                                ) : (<MessageBox variant="danger">Chua Giao Hang</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Thanh Toan</h2>
                                <p>
                                    <strong>PhuongThuc:</strong>{donhang.PhuongThucThanhToan}
                                </p>
                                {donhang.isPaid ? (
                                    <MessageBox variant="success">Thanh Toan Luc {donhang.paidAt}</MessageBox>
                                ) : (<MessageBox variant="danger">Chua Thanh Toan</MessageBox>)}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Chi Tiet Don Hang</h2>
                                <ul>
                                    {donhang.ChiTietDonHang.map((chitiet) => (
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
                                    <div>${donhang.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>GiaoHang</div>
                                    <div>${donhang.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Thue</div>
                                    <div>${donhang.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>TongCong</strong></div>
                                    <div><strong>${donhang.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            {!donhang.isPaid && (
                                <li>{sdkReady ? (
                                    <LoadingBox></LoadingBox>
                                ) : (
                                    <>
                                    {errorPay && (
                                        <MessageBox variant="danger">{errorPay}</MessageBox>
                                    )}
                                    {loadingPay && <LoadingBox></LoadingBox>}
                                    <PayPalButton amount={donhang.totalPrice} onSuccess={thanhcongtratien}></PayPalButton>
                                    </>
                                )}
                                </li>
                            )}
                            {ThongTinKhachHang.isAdmin && donhang.isPaid && !donhang.isDelivered && (
                                <li>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && (
                                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                )}
                                <button
                                    type="button"
                                    className="primary block"
                                    onClick={GiaoHangne}
                                >
                                    Da Giao Hang
                                </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
