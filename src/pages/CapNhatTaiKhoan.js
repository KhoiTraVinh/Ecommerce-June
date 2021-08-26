import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChiTietNguoiDung, Capnhattaikhoanne } from '../actions/KhachHangActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { CAPNHAT_TAIKHOAN_TAYTRANG } from '../constants/KhachHangConstants';

export default function CapNhatTaiKhoan(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const chitietnguoidung = useSelector((state) => state.ThongTinNguoiDung);
  const { loading, error, user } = chitietnguoidung;

  const capnhattk = useSelector((state) => state.CapNhatTK);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = capnhattk;


  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CAPNHAT_TAIKHOAN_TAYTRANG });
      props.history.push('/taikhoan');
    }
    if (!user) {
      dispatch(ChiTietNguoiDung(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const capnhatne = (e) => {
    e.preventDefault();
    dispatch(Capnhattaikhoanne({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <div>
      <form className="form" onSubmit={capnhatne}>
        <div>
          <h1>Cap Nhat Tai Khoan {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="isSeller">Khach Hang</label>
              <input
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Cap Nhat
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}