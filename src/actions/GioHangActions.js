import Axios from 'axios'
import { THEM_HANG_VAO, XOA_HANG, LUU_THONGTIN_GIAOHANG, LUU_PHUONGTHUC_THANHTOAN } from '../constants/GioHangConstants'

export const GioHangActions = (sanphamid, sl) => async (dispatch, getState) => {
    const {data} = await Axios.get(`https://servertmdt.herokuapp.com/api/sanpham/${sanphamid}`);
    dispatch({
        type: THEM_HANG_VAO,
        payload: {
            ten: data.ten,
            hinhanh: data.hinhanh,
            gia: data.gia,
            countInStock: data.countInStock,
            sanpham: data._id,
            sl,
        }
    });
    localStorage.setItem('ChiTietDonHang', JSON.stringify(getState().GioHang.ChiTietDonHang));
};

export const XoaHang = (sanphamid) => (dispatch, getState) => {
    dispatch({type: XOA_HANG, payload: sanphamid});
    localStorage.setItem('ChiTietDonHang', JSON.stringify(getState().GioHang.ChiTietDonHang));
}

export const LuuThongTinGiaoHang = (data) => (dispatch) => {
    dispatch({type: LUU_THONGTIN_GIAOHANG, payload: data});
    localStorage.setItem('ThongTinGiaoHang', JSON.stringify(data));
}

export const LuuPhuongThucThanhToan = (data) => (dispatch) => {
    dispatch({ type: LUU_PHUONGTHUC_THANHTOAN, payload: data});
}
