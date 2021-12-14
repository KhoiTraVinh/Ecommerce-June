import Axios from 'axios'
import {
    KHACHHANG_DANGNHAP_REQUEST,
    KHACHHANG_DANGNHAP_THANHCONG,
    KHACHHANG_DANGNHAP_THATBAI,
    KHACHHANG_DANGKI_REQUEST,
    KHACHHANG_DANGKI_THANHCONG,
    KHACHHANG_DANGKI_THATBAI,
    KHACHHANG_DANGXUAT,
    KHACHHANG_THONGTIN_REQUEST,
    KHACHHANG_THONGTIN_THANHCONG,
    KHACHHANG_THONGTIN_THATBAI,
    KHACHHANG_CAPNHAT_THONGTIN_REQUEST,
    KHACHHANG_CAPNHAT_THONGTIN_THANHCONG,
    KHACHHANG_CAPNHAT_THONGTIN_THATBAI,
    DANHSACH_TAIKHOAN_REQUEST,
    DANHSACH_TAIKHOAN_THANHCONG,
    DANHSACH_TAIKHOAN_THATBAI,
    XOA_TAIKHOAN_REQUEST,
    XOA_TAIKHOAN_THANHCONG,
    XOA_TAIKHOAN_THATBAI,
    CAPNHAT_TAIKHOAN_REQUEST,
    CAPNHAT_TAIKHOAN_THANHCONG,
    CAPNHAT_TAIKHOAN_THATBAI,
} from '../constants/KhachHangConstants.js'


export const DangNhap = (email, password) => async (dispatch) => {
    dispatch({ type: KHACHHANG_DANGNHAP_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post('https://servertmdt.herokuapp.com/api/users/dangnhap', {email, password});
        dispatch({ type: KHACHHANG_DANGNHAP_THANHCONG, payload: data});
        localStorage.setItem('ThongTinKhachHang', JSON.stringify(data));
    }catch(e){
        dispatch({
            type: KHACHHANG_DANGNHAP_THATBAI,
            payload: 
            e.response && e.response.data.message 
            ? e.response.data.message
            : e.message,
        });
    }
};

export const DangKi = (name, email, password) => async (dispatch) => {
    dispatch({ type: KHACHHANG_DANGKI_REQUEST, payload: {email, password}});
    try{
        const {data} = await Axios.post('https://servertmdt.herokuapp.com/api/users/dangki', {name, email, password});
        dispatch({ type: KHACHHANG_DANGKI_THANHCONG, payload: data});
        dispatch({ type: KHACHHANG_DANGNHAP_THANHCONG, payload: data});
        localStorage.setItem('ThongTinKhachHang', JSON.stringify(data));
    }catch(e){
        dispatch({
            type: KHACHHANG_DANGKI_THATBAI,
            payload: 
            e.response && e.response.data.message 
            ? e.response.data.message
            : e.message,
        });
    }
};

export const DangXuat = () => (dispatch) => {
    localStorage.removeItem('ThongTinKhachHang');
    localStorage.removeItem('ChiTietDonHang');
    localStorage.removeItem('ThongTinGiaoHang')
    dispatch({type: KHACHHANG_DANGXUAT});
    document.location.href = '/DangNhap'
}

export const ChiTietNguoiDung = (userId) => async (dispatch, getState) => {
    dispatch({type: KHACHHANG_THONGTIN_REQUEST, payload: userId});
    const{
        DangNhap: {ThongTinKhachHang},
    } = getState();
    try{
        const {data} = await Axios.get(`https://servertmdt.herokuapp.com/api/users/${userId}`, {
            headers: {Authorization: `Bearer ${ThongTinKhachHang?.token}`},
        });
        dispatch({type: KHACHHANG_THONGTIN_THANHCONG, payload: data});
    }catch(e){
        const message = e.response && e.response.data.message 
            ? e.response.data.message
            : e.message;
        dispatch({type: KHACHHANG_THONGTIN_THATBAI, payload: message});
    }
}

export const Capnhattaikhoanne = (user) => async (dispatch, getState) => {
  dispatch({ type: CAPNHAT_TAIKHOAN_REQUEST, payload: user });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.put(`https://servertmdt.herokuapp.com/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: CAPNHAT_TAIKHOAN_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CAPNHAT_TAIKHOAN_THATBAI, payload: message });
  }
};

export const Capnhatthongtin = (user) => async (dispatch, getState) => {
    dispatch({type: KHACHHANG_CAPNHAT_THONGTIN_REQUEST, payload: user});
    const{
        DangNhap: {ThongTinKhachHang},
    } = getState();
    try{
        const {data} = await Axios.put('https://servertmdt.herokuapp.com/api/users/profile', user,{
            headers: {Authorization: `Bearer ${ThongTinKhachHang.token}`},
        });
        dispatch({type: KHACHHANG_CAPNHAT_THONGTIN_THANHCONG, payload: data});
        dispatch({ type: KHACHHANG_DANGNHAP_THANHCONG, payload: data});
        localStorage.setItem('ThongTinKhachHang', JSON.stringify(data));
    }catch(e){
        const message = e.response && e.response.data.message 
            ? e.response.data.message
            : e.message;
        dispatch({type: KHACHHANG_CAPNHAT_THONGTIN_THATBAI, payload: message});
    }
}

export const DanhSachTaiKhoan = () => async (dispatch, getState) => {
  dispatch({ type: DANHSACH_TAIKHOAN_REQUEST });
  try {
    const {
      DangNhap: { ThongTinKhachHang },
    } = getState();
    const { data } = await Axios.get('https://servertmdt.herokuapp.com/api/users', {
      headers: {
        Authorization: `Bearer ${ThongTinKhachHang.token}`,
      },
    });
    dispatch({ type: DANHSACH_TAIKHOAN_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DANHSACH_TAIKHOAN_THATBAI, payload: message });
  }
};

export const XoaTaiKhoan = (userId) => async (dispatch, getState) => {
  dispatch({ type: XOA_TAIKHOAN_REQUEST, payload: userId });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.delete(`https://servertmdt.herokuapp.com/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: XOA_TAIKHOAN_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: XOA_TAIKHOAN_THATBAI, payload: message });
  }
};
