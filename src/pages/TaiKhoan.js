import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DanhSachTaiKhoan, XoaTaiKhoan } from '../actions/KhachHangActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { DANHSACH_TAIKHOAN_TAYTRANG } from '../constants/KhachHangConstants';

export default function TaiKhoan(props) {
  const taikhoan = useSelector((state) => state.TaiKhoan);
  const { loading, error, users } = taikhoan;
  const xoataikhoan = useSelector((state) => state.XoaTaiKhoan);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = xoataikhoan;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(DanhSachTaiKhoan());
    dispatch({
      type: DANHSACH_TAIKHOAN_TAYTRANG,
    });
  }, [dispatch, successDelete]);

  const Xoane = (user) => {
    if (window.confirm('Co Chac Khong Chong Yeu?')) {
      dispatch(XoaTaiKhoan(user._id));
    }
  };

  return (
    <div>
      <h1>Tai Khoan</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Xoa Tai Khoan Thanh Cong</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ten</th>
              <th>EMAIL</th>
              <th>La KhachHang</th>
              <th>La ADMIN</th>
              <th>Hanh Dong</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/taikhoan/${user._id}/sua`)}
                  >Sua
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => Xoane(user)}
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