import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChiTietSanPhams, CapNhatSanPham } from '../actions/SanPhamActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CAPNHAT_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';
import Axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function CapNhatVoucher(props) {
  const url='https://servertmdt.herokuapp.com/api/vouchers/'
  const voucherID = props.match.params.id;
  const [mota, setMota] = useState('');
  const [giamgia, setGiamGia] = useState('');
  const [toida, setToiDa] = useState('');
  const [ngaybatdau, setNgayBatDau] = useState('');
  const [ngayketthuc, setNgayKetThuc] = useState('');

  // const chitietsanpham = useSelector((state) => state.ChiTietSanPham);
  // const { loading, error, sanpham } = chitietsanpham;
  // const capnhatsanpham = useSelector((state) => state.CapNhatSanPham);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } = capnhatsanpham;
  // const dispatch = useDispatch();
  useEffect(() => {
    // if (successUpdate) {
    //   props.history.push('/voucher');
    // }
    // if (!sanpham || sanpham._id !== sanphamId || successUpdate) {
    //   dispatch({ type: CAPNHAT_SANPHAM_TAYTRANG });
    //   dispatch(ChiTietSanPhams(sanphamId));
    // } else {
    //   setMota(sanpham.ten);
    //   setGiamGia(sanpham.gia);
    //   setImage(sanpham.hinhanh);
    //   setToiDa(sanpham.loai);
    //   setNgayBatDau(sanpham.countInStock);
    //   setNgayKetThuc(sanpham.thuonghieu);
    //   setDescription(sanpham.mota);
    // }
  }, []);
  const capnhatne =async (e) => {
    e.preventDefault();
    const voucher ={
      _id:voucherID,
      mota:mota,
      giamgia:giamgia,
      toida:toida,
      ngaybatdau:ngaybatdau,
      ngayketthuc:ngayketthuc
    }

    Axios.put(url+voucherID,voucher,{headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` }})
    .then(res=>{
      console.log(res.data)
    })
    .catch(err=>console.log(err))
    // dispatch(
    //   CapNhatSanPham({
    //     _id: voucherID,
    //     mota,
    //     giamgia,
    //     toida,
    //     ngaybatdau,
    //     ngayketthuc,
    //   })
    // );
  };
  // const [loadingUpload, setLoadingUpload] = useState(false);
  // const [errorUpload, setErrorUpload] = useState('');

  const dangnhap = useSelector((state) => state.DangNhap);
  const { ThongTinKhachHang } = dangnhap;
  // const thaydoihinhne = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('hinhanh', file);
  //   setLoadingUpload(true);
  //   try {
  //     const { data } = await Axios.post('https://servertmdt.herokuapp.com/api/vouchers', bodyFormData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${ThongTinKhachHang.token}`,
  //       },
  //     });
  //     setImage(data);
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };
  return (
    <div>
      <form className="form" onSubmit={capnhatne}>
        <div>
          <h1>Cap Nhat Voucher {voucherID}</h1>
        </div>
        {/* {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <> */}
            <div>
              <label htmlFor="name">Mô tả</label>
              <input
                id="name"
                type="text"
                placeholder="Nhập mô tả"
                value={mota}
                onChange={(e) => setMota(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Giá trị</label>
              <input
                id="price"
                type="text"
                placeholder="Nhập giá trị voucher"
                value={giamgia}
                onChange={(e) => setGiamGia(e.target.value)}
              ></input>
            </div>
            {/* <div>
              <label htmlFor="hinhanh">Hinh Anh</label>
              <input
                id="hinhanh"
                type="text"
                placeholder="Link hinh anh"
                value={hinhanh}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div> */}
            {/* <div>
              <label htmlFor="imageFile">Hinh Anh File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={thaydoihinhne}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div> */}
            <div>
              <label htmlFor="category">Giá trị tối đa</label>
              <input
                id="category"
                type="text"
                placeholder="Mời nhập giá trị tối đa"
                value={toida}
                onChange={(e) => setToiDa(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Ngày bắt đầu</label>
              {/* <input
                id="brand"
                type="text"
                placeholder="Mời nhập ngày bắt đầu"
                value={ngaybatdau}
                onChange={(e) => setNgayBatDau(e.target.value)}
              ></input> */}
              <DatePicker selected={ngaybatdau} onChange={(date)=>setNgayBatDau(date)}/>
            </div>
            <div>
              <label htmlFor="countInStock">Ngày kết thúc</label>
              {/* <input
                id="countInStock"
                type="datetime"
                placeholder="Mời nhập ngày kết thúc voucher"
                value={ngayketthuc}
                onChange={(e) => setNgayKetThuc(e.target.value)}
              ></input> */}
              <DatePicker selected={ngayketthuc} onChange={(date)=>setNgayKetThuc(date)}/>
            </div>
            {/* <div>
              <label htmlFor="description">Mo Ta</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div> */}
            <div>
              <label></label>
              <button className="primary" type="submit">
                Cap Nhat
              </button>
            </div>
          {/* </>
        )} */}
      </form>
    </div>
  );
}