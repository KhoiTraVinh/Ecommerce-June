import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { TaoSanPham ,DanhSachSanPhams, XoaSanPham } from '../actions/SanPhamActions';
import { TAO_SANPHAM_TAYTRANG, XOA_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';

export default function DanhSachVoucher(props) {
    const url='https://servertmdt.herokuapp.com/api/vouchers/'
    const [vouchers, setVouchers]= useState([]);
    const dangnhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang } = dangnhap;
    const fetchAPI= async ()=>{
        Axios.get(url)
        .then(res=>{
            setVouchers(res.data)
        })
    }
    useEffect(() => {
        fetchAPI();
    }, [vouchers]);
    const Xoane = (voucher) => {
        if (window.confirm('Co Chac La Muon Xoa Khong Fen?')) {
            Axios.delete(url+voucher._id,{headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` }})
            .then(res=>console.log(res.data))
        }
    }
    const Taone = () => {
        const voucher = {
            mota:"Test",
            ngaybatdau:new Date(),
            ngayketthuc:"2021-12-30",
            giamgia:0.9,
            toida:20
        }
        Axios.post(
            url, 
            voucher,
            {headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` }})
        .then(res=>console.log(res))
        // dispatch(TaoSanPham());
    };
    return (
        <div>
            <div className="row">
                <h1>Vouchers</h1>
                <button type="button" className="primary" onClick={Taone}>
                Tao Voucher
                </button>
            </div>
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>MOTA</th>
                    <th>GIAMGIA</th>
                    <th>TOIDA</th>
                    <th>NGAYBATDAT</th>
                    <th>NGAYKETTHUC</th>
                    <th>HANHDONG</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map((voucher) => (
                    <tr key={voucher._id}>
                        <td>{voucher._id}</td>
                        <td>{voucher.mota}</td>
                        <td>{voucher.giamgia}</td>
                        <td>{voucher.toida}</td>
                        <td>{voucher.ngaybatdau}</td>
                        <td>{voucher.ngayketthuc}</td>
                        <td>
                        <button
                            type="button"
                            className="small"
                            onClick={() =>
                            props.history.push(`/voucher/${voucher._id}/sua`)
                            }
                        >
                            Sua
                        </button>
                        <button
                            type="button"
                            className="small"
                            onClick={() => Xoane(voucher)}
                        >
                            Xoa
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}
