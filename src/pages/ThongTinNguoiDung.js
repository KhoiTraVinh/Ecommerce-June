import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import {ChiTietNguoiDung, Capnhatthongtin} from '../actions/KhachHangActions'
import {TAYTRANG_KHACHHANG_CAPNHAT_THONGTIN} from '../constants/KhachHangConstants.js'


export default function ThongTinNguoiDung() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [xacnhanmatkhau, setXacnhanmatkhau] = useState('');
    const dangnhap = useSelector((state) => state.DangNhap);
    const {ThongTinKhachHang} = dangnhap;
    const chitietnguoidung = useSelector((state) => state.ThongTinNguoiDung);
    const {loading, error, user}= chitietnguoidung;
    const capnhatthongtin = useSelector((state) => state.Capnhatthongtin);
    const {loading: loadingCapnhat, success: successCapnhat, error: errorCapnhat} = capnhatthongtin;
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user)
        {
            dispatch({ type: TAYTRANG_KHACHHANG_CAPNHAT_THONGTIN });
            dispatch(ChiTietNguoiDung(ThongTinKhachHang._id));
        }
        else{
            setName(user.name);
            setEmail(user.email);
        }
    },[dispatch, ThongTinKhachHang._id, user])
    const submitne = (e) =>
    {
        e.preventDefault();
        if(password !== xacnhanmatkhau)
        {
            alert('Mat Khau Va Xac Nhan Mat Khau Khong Trung');
        }
        else{
            dispatch(Capnhatthongtin({userId: ThongTinKhachHang._id, name, email, password}));
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitne}>
                <div>
                    <h1>Thong Tin Nguoi Dung</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="danger">{error}</MessageBox>
                    :
                    <>
                        {loadingCapnhat && <LoadingBox></LoadingBox>}
                        {errorCapnhat && (<MessageBox variant="danger">{errorCapnhat}</MessageBox>)}
                        {successCapnhat && (<MessageBox variant="success">Cap Nhat Thanh Cong</MessageBox>)}
                        <div>
                            <label htmlFor="name">Ten</label>
                            <input id="name" type="text" placeholder="Nhap Ten" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Nhap email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password">Mat Khau</label>
                            <input id="password" type="password" placeholder="Nhap Mat Khau" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="xacnhanmatkhau">Xac Nhan Mat Khau</label>
                            <input id="xacnhanmatkhau" type="password" placeholder="Nhap Xac Nhan Mat Khau" onChange={(e) => setXacnhanmatkhau(e.target.value)}/>
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit">
                                Cap Nhat
                            </button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
