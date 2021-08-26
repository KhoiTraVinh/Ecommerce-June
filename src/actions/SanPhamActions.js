import Axios from 'axios'
import { SANPHAM_DANHSACH_REQUEST, SANPHAM_DANHSACH_THANHCONG, SANPHAM_DANHSACH_THATBAI, SANPHAM_CHITIET_REQUEST, SANPHAM_CHITIET_THANHCONG, SANPHAM_CHITIET_THATBAI, TAO_SANPHAM_REQUEST, TAO_SANPHAM_THANHCONG, TAO_SANPHAM_THATBAI, CAPNHAT_SANPHAM_REQUEST, CAPNHAT_SANPHAM_THANHCONG, CAPNHAT_SANPHAM_THATBAI, XOA_SANPHAM_REQUEST, XOA_SANPHAM_THANHCONG, XOA_SANPHAM_THATBAI, REVIEW_SANPHAM_REQUEST, REVIEW_SANPHAM_THANHCONG, REVIEW_SANPHAM_THATBAI } from '../constants/SanPhamConstants'

export const DanhSachSanPhams = () => async (dispatch) => {
    dispatch({
        type: SANPHAM_DANHSACH_REQUEST
    });
    try{
        const {data} = await Axios.get('/api/sanpham')
        dispatch({ type: SANPHAM_DANHSACH_THANHCONG, payload: data});
    }catch(e){
        dispatch({ type: SANPHAM_DANHSACH_THATBAI, payload: e.message });
    }
}

export const ChiTietSanPhams = (sanphamid) => async (dispatch) => {
    dispatch({
        type: SANPHAM_CHITIET_REQUEST,
        payload: sanphamid
    });
    try{
        const {data} = await Axios.get(`/api/sanpham/${sanphamid}`);
        dispatch({ type: SANPHAM_CHITIET_THANHCONG, payload: data});
    }catch(e){
        dispatch({
            type: SANPHAM_CHITIET_THATBAI,
            payload: 
            e.response && e.response.data.message 
            ? e.response.data.message
            : e.message,
        });    
    }
}

export const TaoSanPham = () => async (dispatch, getState) => {
  dispatch({ type: TAO_SANPHAM_REQUEST });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/sanpham',
      {},
      {
        headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
      }
    );
    dispatch({
      type: TAO_SANPHAM_THANHCONG,
      payload: data.sanpham,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: TAO_SANPHAM_THATBAI, payload: message });
  }
};
export const CapNhatSanPham = (sanpham) => async (dispatch, getState) => {
  dispatch({ type: CAPNHAT_SANPHAM_REQUEST, payload: sanpham });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/sanpham/${sanpham._id}`, sanpham, {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: CAPNHAT_SANPHAM_THANHCONG, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CAPNHAT_SANPHAM_THATBAI, error: message });
  }
}

export const XoaSanPham = (sanphamId) => async (dispatch, getState) => {
  dispatch({ type: XOA_SANPHAM_REQUEST, payload: sanphamId });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/sanpham/${sanphamId}`, {
      headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
    });
    dispatch({ type: XOA_SANPHAM_THANHCONG, payload: data });
    } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: XOA_SANPHAM_THATBAI, payload: message });
  }
};

export const TaoReView = (sanphamId, review) => async (
  dispatch,
  getState
) => {
  dispatch({ type: REVIEW_SANPHAM_REQUEST });
  const {
    DangNhap: { ThongTinKhachHang },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/sanpham/${sanphamId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${ThongTinKhachHang.token}` },
      }
    );
    dispatch({
      type: REVIEW_SANPHAM_THANHCONG,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: REVIEW_SANPHAM_THATBAI, payload: message });
  }
};