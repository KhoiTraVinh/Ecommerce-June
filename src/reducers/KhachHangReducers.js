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
    TAYTRANG_KHACHHANG_CAPNHAT_THONGTIN,
    DANHSACH_TAIKHOAN_REQUEST,
    DANHSACH_TAIKHOAN_THANHCONG,
    DANHSACH_TAIKHOAN_THATBAI,
    DANHSACH_TAIKHOAN_TAYTRANG,
    XOA_TAIKHOAN_REQUEST,
    XOA_TAIKHOAN_THANHCONG,
    XOA_TAIKHOAN_THATBAI,
    XOA_TAIKHOAN_TAYTRANG,
    CAPNHAT_TAIKHOAN_REQUEST,
    CAPNHAT_TAIKHOAN_THANHCONG,
    CAPNHAT_TAIKHOAN_THATBAI,
    CAPNHAT_TAIKHOAN_TAYTRANG,
    DIACHI_KHACHHANG_XACNHAN
} from '../constants/KhachHangConstants.js'

export const KhachHangDangNhapReducer = (state = {}, action) => {
    switch(action.type){
        case KHACHHANG_DANGNHAP_REQUEST:
            return {loading: true}
        case KHACHHANG_DANGNHAP_THANHCONG:
            return {loading: false, ThongTinKhachHang: action.payload}
        case KHACHHANG_DANGNHAP_THATBAI:
            return {loading: false, error: action.payload}
        case KHACHHANG_DANGXUAT:
            return {};
        default:
            return state;
    }
};

export const KhachHangDangKiReducer = (state = {}, action) => {
    switch(action.type){
        case KHACHHANG_DANGKI_REQUEST:
            return {loading: true}
        case KHACHHANG_DANGKI_THANHCONG:
            return {loading: false, ThongTinKhachHang: action.payload}
        case KHACHHANG_DANGKI_THATBAI:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
};

export const ChiTietNguoiDungReducers = (state = { loading: true }, action) => {
    switch (action.type) {
        case KHACHHANG_THONGTIN_REQUEST:
            return {loading: true};
        case KHACHHANG_THONGTIN_THANHCONG:
            return {loading: false, user: action.payload};
        case KHACHHANG_THONGTIN_THATBAI:
            return {loading: false, error: action.payload}
        default:
            return state;
    };
}


export const CapnhatthongtinReducers = (state = {}, action) => {
    switch(action.type){
        case KHACHHANG_CAPNHAT_THONGTIN_REQUEST:
            return {loading: true}
        case KHACHHANG_CAPNHAT_THONGTIN_THANHCONG:
            return {loading: false, success: action.payload}
        case KHACHHANG_CAPNHAT_THONGTIN_THATBAI:
            return {loading: false, error: action.payload}
        case TAYTRANG_KHACHHANG_CAPNHAT_THONGTIN:
            return {};
        default:
            return state;
    }
};

export const CapNhatTaiKhoanReducers = (state = {}, action) => {
  switch (action.type) {
    case CAPNHAT_TAIKHOAN_REQUEST:
      return { loading: true };
    case CAPNHAT_TAIKHOAN_THANHCONG:
      return { loading: false, success: true };
    case CAPNHAT_TAIKHOAN_THATBAI:
      return { loading: false, error: action.payload };
    case CAPNHAT_TAIKHOAN_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const DanhSachTaiKhoanReducers = (state = { loading: true }, action) => {
  switch (action.type) {
    case DANHSACH_TAIKHOAN_REQUEST:
      return { loading: true };
    case DANHSACH_TAIKHOAN_THANHCONG:
      return { loading: false, users: action.payload };
    case DANHSACH_TAIKHOAN_THATBAI:
      return { loading: false, error: action.payload };
    case DANHSACH_TAIKHOAN_TAYTRANG:
        return {loading: true};
    default:
      return state;
  }
};

export const XoaTaiKhoanReducers = (state = {}, action) => {
  switch (action.type) {
    case XOA_TAIKHOAN_REQUEST:
      return { loading: true };
    case XOA_TAIKHOAN_THANHCONG:
      return { loading: false, success: true };
    case XOA_TAIKHOAN_THATBAI:
      return { loading: false, error: action.payload };
    case XOA_TAIKHOAN_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const DiaChiKhachHangReducers = (state = {}, action) => {
  switch (action.type) {
    case DIACHI_KHACHHANG_XACNHAN:
      return { diachi: action.payload };
    default:
      return state;
  }
};

