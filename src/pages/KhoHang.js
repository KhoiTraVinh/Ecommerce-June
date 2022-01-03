import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { TaoSanPham ,DanhSachSanPhams, XoaSanPham } from '../actions/SanPhamActions';
import { TAO_SANPHAM_TAYTRANG, XOA_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';

export default function KhoHang(props) {
    const url='https://servertmdt.herokuapp.com/api/khohang/'
    const [khohangs, setKhoHangs]= useState([]);
    const dangnhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang } = dangnhap;
    const fetchAPI= async ()=>{
        Axios.get(url)
        .then(res=>{
            setKhoHangs(res.data)
        })
    }
    useEffect(() => {
        fetchAPI();
    }, [khohangs]);
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
                <h1>Kho Hàng</h1>
                {/* <button type="button" className="primary" onClick={Taone}>
                Kho Hang
                </button> */}
            </div>
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>ID_SANPHAM</th>
                    <th>SOLUONG</th>
                    <th>NGAYNHAP</th>
                    {/* <th>HANHDONG</th> */}
                    </tr>
                </thead>
                <tbody>
                    {khohangs.map((khohang) => (
                    <tr key={khohang._id}>
                        <td>{khohang._id}</td>
                        <td>{khohang.sanpham}</td>
                        <td>{khohang.soluong}</td>
                        <td>{khohang.createdAt}</td>
                        {/* <td>
                        <button
                            type="button"
                            className="small"
                            onClick={() =>
                            props.history.push(`/voucher/${khohang._id}/sua`)
                            }
                        >
                            Nhap
                        </button>
                        <button
                            type="button"
                            className="small"
                            onClick={() => Xoane(khohang)}
                        >
                            Xuat
                        </button>
                        </td> */}
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    )
}
