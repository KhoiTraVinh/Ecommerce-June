import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChiTietSanPhams, CapNhatSanPham } from '../actions/SanPhamActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CAPNHAT_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';
import Axios from 'axios';

export default function CapNhatSanPhamTrang(props) {
  const sanphamId = props.match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [hinhanh, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const chitietsanpham = useSelector((state) => state.ChiTietSanPham);
  const { loading, error, sanpham } = chitietsanpham;
  const capnhatsanpham = useSelector((state) => state.CapNhatSanPham);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = capnhatsanpham;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push('/danhsachsanpham');
    }
    if (!sanpham || sanpham._id !== sanphamId || successUpdate) {
      dispatch({ type: CAPNHAT_SANPHAM_TAYTRANG });
      dispatch(ChiTietSanPhams(sanphamId));
    } else {
      setName(sanpham.ten);
      setPrice(sanpham.gia);
      setImage(sanpham.hinhanh);
      setCategory(sanpham.loai);
      setCountInStock(sanpham.countInStock);
      setBrand(sanpham.thuonghieu);
      setDescription(sanpham.mota);
    }
  }, [sanpham, dispatch, sanphamId,  successUpdate, props.history]);
  const capnhatne = (e) => {
    e.preventDefault();
    dispatch(
      CapNhatSanPham({
        _id: sanphamId,
        name,
        price,
        hinhanh,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');
  const dangnhap = useSelector((state) => state.DangNhap);
  const { ThongTinKhachHang } = dangnhap;
  const thaydoihinhne = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('hinhanh', file);
    bodyFormData.append('id', sanphamId);
    setLoadingUpload(true);
    try {
      await Axios.post('https://servertmdt.herokuapp.com/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${ThongTinKhachHang.token}`,
        },
      }).then(res=>{
        console.log(res.data);
        setImage(res.data.secure_url);
      })
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div>
      <form className="form" onSubmit={capnhatne}>
        <div>
          <h1>Cap Nhat San Pham {sanphamId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Ten</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Gia</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="hinhanh">Hinh Anh</label>
              <input
                id="hinhanh"
                type="text"
                placeholder="Link hinh anh"
                value={hinhanh}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
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
            </div>
            <div>
              <label htmlFor="category">Loai</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">ThuongHieu</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">Hang Ton</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Mo Ta</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Cap Nhat
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}