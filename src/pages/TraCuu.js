import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DanhSachSanPhams } from '../actions/SanPhamActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Sanpham from '../components/Sanpham';

export default function TraCuu(props) {
  const { ten = 'all' } = useParams();
  const dispatch = useDispatch();
  const danhsachsanpham = useSelector((state) => state.DanhSachSanPham);
  const { loading, error, sanphams } = danhsachsanpham;
  useEffect(() => {
    dispatch(DanhSachSanPhams({ ten: ten !== 'all' ? ten : '' }));
  }, [dispatch, ten]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{sanphams.length} Ket Qua</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>DanhSach</h3>
          <ul>
            <li>Loai</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {sanphams.length === 0 && (
                <MessageBox>Khong Tim Thay San Pham</MessageBox>
              )}
              <div className="row center">
                {sanphams.map((sanpham) => (
                  <Sanpham key={sanpham._id} sanpham={sanpham}></Sanpham>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}