import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DanhSachDonHangAdminNe, XoaDonHang } from '../actions/DonHangActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { XOA_DONHANG_TAYTRANG } from '../constants/DonHangConstants';

export default function DanhSachDonHangAdmins(props) {
  const danhsachdonhangadmin = useSelector((state) => state.DanhSachDonHangAdmin);
  const { loading, error, donhangs } = danhsachdonhangadmin;
  const dispatch = useDispatch();
  const xoadonhang = useSelector((state) => state.XoaDonHang);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = xoadonhang;
  useEffect(() => {
    dispatch({ type: XOA_DONHANG_TAYTRANG });
    dispatch(DanhSachDonHangAdminNe());
  }, [dispatch, successDelete]);
  const Xoane = (donhang) => {
    if (window.confirm('Co Chac La Muon Xoa Khong Anh Trai?')) {
      dispatch(XoaDonHang(donhang._id));
    }
  };
  return (
    <div>
      <h1>Tat Ca Don Hang</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tai Khoan</th>
              <th>Ngay</th>
              <th>Tong Cong</th>
              <th>Tra Tien</th>
              <th>Gia Hang</th>
              <th>Hang Dong</th>
            </tr>
          </thead>
          <tbody>
            {donhangs.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.ThongTinGiaoHang.hoten}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Chua Tra'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Chua Giao'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/chitietdonhang/${order._id}`);
                    }}
                  >
                    ChiTiet
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => Xoane(order)}
                  >
                    Xoa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}