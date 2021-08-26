import { THEM_HANG_VAO, XOA_HANG, LUU_THONGTIN_GIAOHANG, LUU_PHUONGTHUC_THANHTOAN, GIOHANG_RONG } from '../constants/GioHangConstants'

export const GioHangReducers = (state = { ChiTietDonHang: []}, action) => {
    switch (action.type) {
        case THEM_HANG_VAO:
            const chitiet = action.payload;
            const chitietdatontai = state.ChiTietDonHang.find((x) => x.sanpham === chitiet.sanpham);
            if(chitietdatontai){
                return{
                    ...state,
                    ChiTietDonHang: state.ChiTietDonHang.map((x) => 
                        x.sanpham === chitietdatontai.sanpham ? chitiet : x),
                };
            }else
            {
                return { ...state, ChiTietDonHang: [...state.ChiTietDonHang, chitiet]};
            }
        case XOA_HANG:
            return{
                ...state,
                ChiTietDonHang: state.ChiTietDonHang.filter((x) => x.sanpham !== action.payload),
            };
        case LUU_THONGTIN_GIAOHANG:
            return{
                ...state, ThongTinGiaoHang: action.payload
            };
        case LUU_PHUONGTHUC_THANHTOAN:
            return{
                ...state, PhuongThucThanhToan: action.payload
            };
        case GIOHANG_RONG:
            return{
                ...state, ChiTietDonHang: []
            };
        default:
            return state;
    }
}