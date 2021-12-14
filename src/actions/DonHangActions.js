import Axios from 'axios'
import { TAO_DONHANG_REQUEST, TAO_DONHANG_THANHCONG, TAO_DONHANG_THATBAI, CHITIET_DONHANG_REQUEST, CHITIET_DONHANG_THANHCONG, CHITIET_DONHANG_THATBAI, THANHTOAN_DONHANG_REQUEST, THANHTOAN_DONHANG_THANHCONG, THANHTOAN_DONHANG_THATBAI, DANHSACH_DONHANG_REQUEST, DANHSACH_DONHANG_THANHCONG, DANHSACH_DONHANG_THATBAI, DANHSACH_DONHANG_ADMIN_REQUEST, DANHSACH_DONHANG_ADMIN_THANHCONG, DANHSACH_DONHANG_ADMIN_THATBAI, XOA_DONHANG_REQUEST, XOA_DONHANG_THANHCONG, XOA_DONHANG_THATBAI, GIAO_DONHANG_REQUEST, GIAO_DONHANG_THANHCONG, GIAO_DONHANG_THATBAI, THONGKE_DONHANG_REQUEST, THONGKE_DONHANG_THANHCONG, THONGKE_DONHANG_THATBAI } from '../constants/DonHangConstants'
import {GIOHANG_RONG} from '../constants/GioHangConstants'

export const TaoDonHang = (donhang)  => async (dispatch, getState) => {
    dispatch({ type: TAO_DONHANG_REQUEST, payload: donhang});
    try {
        const {
            DangNhap: {ThongTinKhachHang},
        } = getState();
        const {data} = await Axios.post('https://servertmdt.herokuapp.com/api/donhangs', donhang, {
            headers: {
                Authorization: `Bearer ${ThongTinKhachHang.token}`,
            },
        });
        dispatch({type: TAO_DONHANG_THANHCONG, payload: data.donhang});
        dispatch({type: GIOHANG_RONG});
        localStorage.removeItem('ChiTietDonHang');
    }catch(e) {
        dispatch({
            type: TAO_DONHANG_THATBAI,
            payload: 
                e.response && e.response.data.message
                ? e.response.data.message
                : e.message,
        });
    }
}

export const ChiTietsDonHang = (donhangId) => async (dispatch, getState) => {
    dispatch({type: CHITIET_DONHANG_REQUEST, payload: donhangId});
    const {
        DangNhap: {ThongTinKhachHang},
    } = getState();
    try{
        const {data} = await Axios.get(`https://servertmdt.herokuapp.com/api/donhangs/${donhangId}`, {
            headers: {Authorization: `Bearer ${ThongTinKhachHang.token}`},
        });
        dispatch({type: CHITIET_DONHANG_THANHCONG, payload:data});
    }catch(e){
        const message = e.response && e.response.data.message 
            ? e.response.data.message
            : e.message;
        dispatch({type: CHITIET_DONHANG_THATBAI, payload: message});
    }  
}


export const ThanhToanDonHang = (donhang, paymentResult) => async (dispatch, getState) => {
    dispatch({type: THANHTOAN_DONHANG_REQUEST, payload: {donhang, paymentResult}});
    const{
        DangNhap: {ThongTinKhachHang},
    } = getState();
    try{
        const {data} = Axios.put(`https://servertmdt.herokuapp.com/api/donhangs/${donhang._id}/pay`, paymentResult, {
            headers: {Authorization: `Bearer ${ThongTinKhachHang.token}`},
        });
        dispatch({type: THANHTOAN_DONHANG_THANHCONG, payload: data});
    }catch(e){
        const message = e.response && e.response.data.message 
            ? e.response.data.message
            : e.message;
        dispatch({type: THANHTOAN_DONHANG_THATBAI, payload: message});
    }
}

export const DanhSachDonHangne = () => async (dispatch, getState) => {
    dispatch({type: DANHSACH_DONHANG_REQUEST});
    const{
        DangNhap: {ThongTinKhachHang},
    } = getState();
    try{
        const {data} = await Axios.get('https://servertmdt.herokuapp.com/api/donhangs/mine', {
            headers: {Authorization: `Bearer ${ThongTinKhachHang.token}`},
        });
        dispatch({type: DANHSACH_DONHANG_THANHCONG, payload: data});
    }catch(e){
        const message = e.response && e.response.data.message 
            ? e.response.data.message
            : e.message;
        dispatch({type: DANHSACH_DONHANG_THATBAI, payload: message});
    }
}

export const DanhSachDonHangAdminNe = () => async (dispatch, getState) => {
  dispatch({ type: DANHSACH_DONHANG_ADMIN_REQUEST });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.get('https://servertmdt.herokuapp.com/api/donhangs', {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: DANHSACH_DONHANG_ADMIN_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DANHSACH_DONHANG_ADMIN_THATBAI, payload: message });
  }
};

export const XoaDonHang = (donhangId) => async (dispatch, getState) => {
  dispatch({ type: XOA_DONHANG_REQUEST, payload: donhangId });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = Axios.delete(`https://servertmdt.herokuapp.com/api/donhangs/${donhangId}`, {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: XOA_DONHANG_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: XOA_DONHANG_THATBAI, payload: message });
  }
};

export const GiaoHang = (donhangId) => async (dispatch, getState) => {
  dispatch({ type: GIAO_DONHANG_REQUEST, payload: donhangId });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = Axios.put(
      `https://servertmdt.herokuapp.com/api/donhangs/${donhangId}/giaohang`,
      {},
      {
        headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
      }
    );
    dispatch({ type: GIAO_DONHANG_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: GIAO_DONHANG_THATBAI, payload: message });
  }
};

export const ThongKeDonHang = () => async (dispatch, getState) => {
  dispatch({ type: THONGKE_DONHANG_REQUEST });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.get('https://servertmdt.herokuapp.com/api/donhangs/thongke', {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: THONGKE_DONHANG_THANHCONG, payload: data });
  } catch (error) {
    dispatch({
      type: THONGKE_DONHANG_THATBAI,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


