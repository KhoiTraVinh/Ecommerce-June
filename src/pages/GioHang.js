import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GioHangActions, XoaHang} from '../actions/GioHangActions'
import {Link} from 'react-router-dom'
import MessageBox from '../components/MessageBox'

export default function GioHang(props) {
    const sanphamid = props.match.params.id;
    const sl = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
    const giohang = useSelector((state) => state.GioHang)
    const {ChiTietDonHang} = giohang
    const dispatch = useDispatch();
    useEffect(() => {
        if(sanphamid) {
            dispatch(GioHangActions(sanphamid, sl));
        }
    },[dispatch, sanphamid, sl]);
    const XoaSanPham = (id) =>{
        dispatch(XoaHang(id));
    }
    const Checkout = () => {
        props.history.push('/dangnhap?redirec=giaohang');
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>GioHang</h1>
                {ChiTietDonHang.length === 0?<MessageBox>
                    Gio Hang Rong <Link to="/">Mua Hang</Link>
                </MessageBox>
                :
                (
                    <ul>
                        {ChiTietDonHang.map((chitiet) => (
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
                                    <div>
                                        <select value={chitiet.sl}
                                        onChange={(e) => 
                                        dispatch(
                                            GioHangActions(chitiet.sanpham,
                                            Number(e.target.value))
                                        )}>
                                        {[...Array(chitiet.countInStock).keys()].map(
                                            (x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                                )
                                        )}
                                        </select>
                                    </div>
                                    <div>${chitiet.gia}</div>
                                    <div>
                                        <button
                                        type="button"
                                        onClick={() => XoaSanPham(chitiet.sanpham)}
                                        >
                                            Xoa
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                TongCong: ({ChiTietDonHang.reduce((a, c) => a + c.sl, 0)} Mon) : $
                                {ChiTietDonHang.reduce((a, c) => a + c.gia * c.sl, 0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={Checkout} className="primary block" disabled={ChiTietDonHang.length === 0}>
                                Chuyen Den Thanh Toan
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
