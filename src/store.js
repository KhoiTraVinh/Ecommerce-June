import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { DanhSachSanPhamReducer, ChiTietSanPhamReducer, TaoSanPhamReducers, CapNhatSanPhamReducers, XoaSanPhamReducers, TaoReviewSanPhamReducers } from './reducers/SanPhamReducers'
import { GioHangReducers } from './reducers/GioHangReducers'
import { KhachHangDangNhapReducer, KhachHangDangKiReducer, ChiTietNguoiDungReducers, CapnhatthongtinReducers, DanhSachTaiKhoanReducers, XoaTaiKhoanReducers, CapNhatTaiKhoanReducers, DiaChiKhachHangReducers } from './reducers/KhachHangReducers'
import { DonHangReducers, ChiTietsDonHangReducers, ThanhToanDonHangReducers, DanhSachDonHangReducers, DanhSachDonHangAdminReducers, XoaDonHangReducers, GiaoHangReducers, ThongKeDonHangReducers } from './reducers/DonHangReducers'

const initialState = {
    DangNhap: {
        ThongTinKhachHang: localStorage.getItem('ThongTinKhachHang')
        ? JSON.parse(localStorage.getItem('ThongTinKhachHang'))
        : null,
    },
    GioHang: {
        ChiTietDonHang: localStorage.getItem('ChiTietDonHang')
        ? JSON.parse(localStorage.getItem('ChiTietDonHang'))
        : [],
        ThongTinGiaoHang: localStorage.getItem('ThongTinGiaoHang')
        ? JSON.parse(localStorage.getItem('ThongTinGiaoHang'))
        : {},
        PhuongThucThanhToan: '',
    },
};
const reducer = combineReducers({
    DanhSachSanPham: DanhSachSanPhamReducer,
    ChiTietSanPham: ChiTietSanPhamReducer,
    GioHang: GioHangReducers,
    DangNhap: KhachHangDangNhapReducer,
    DangKi: KhachHangDangKiReducer,
    DonHang: DonHangReducers,
    ChiTietDonHang: ChiTietsDonHangReducers,
    ThanhToanDonHang: ThanhToanDonHangReducers,
    DanhSachDonHang: DanhSachDonHangReducers,
    ThongTinNguoiDung: ChiTietNguoiDungReducers,
    Capnhatthongtin: CapnhatthongtinReducers,
    TaoSanPham: TaoSanPhamReducers,
    CapNhatSanPham: CapNhatSanPhamReducers,
    XoaSanPham: XoaSanPhamReducers,
    DanhSachDonHangAdmin: DanhSachDonHangAdminReducers,
    XoaDonHang: XoaDonHangReducers,
    GiaoHang: GiaoHangReducers,
    TaiKhoan: DanhSachTaiKhoanReducers,
    XoaTaiKhoan: XoaTaiKhoanReducers,
    ReViewSanPham: TaoReviewSanPhamReducers,
    ThongKeDonHang: ThongKeDonHangReducers,
    CapNhatTK: CapNhatTaiKhoanReducers,
    DiaChiKhachHang: DiaChiKhachHangReducers,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store