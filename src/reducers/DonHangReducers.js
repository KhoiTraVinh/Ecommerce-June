import { TAO_DONHANG_REQUEST, TAO_DONHANG_THANHCONG, TAYTRANG_DONHANG, TAO_DONHANG_THATBAI, CHITIET_DONHANG_REQUEST, CHITIET_DONHANG_THANHCONG, CHITIET_DONHANG_THATBAI, THANHTOAN_DONHANG_REQUEST, THANHTOAN_DONHANG_THANHCONG, THANHTOAN_DONHANG_THATBAI, TAYTRANG_THANHTOAN_DONHANG, DANHSACH_DONHANG_REQUEST, DANHSACH_DONHANG_THANHCONG, DANHSACH_DONHANG_THATBAI, DANHSACH_DONHANG_ADMIN_REQUEST, DANHSACH_DONHANG_ADMIN_THANHCONG, DANHSACH_DONHANG_ADMIN_THATBAI, XOA_DONHANG_REQUEST, XOA_DONHANG_THANHCONG, XOA_DONHANG_THATBAI, XOA_DONHANG_TAYTRANG, GIAO_DONHANG_REQUEST, GIAO_DONHANG_THANHCONG, GIAO_DONHANG_THATBAI, GIAO_DONHANG_TAYTRANG, THONGKE_DONHANG_REQUEST, THONGKE_DONHANG_THANHCONG, THONGKE_DONHANG_THATBAI } from '../constants/DonHangConstants'

export const DonHangReducers = (state = {}, action) => {
    switch(action.type) {
        case TAO_DONHANG_REQUEST:
            return{loading: true}
        case TAO_DONHANG_THANHCONG:
            return {loading: false, success: true, donhang: action.payload}
        case TAO_DONHANG_THATBAI:
            return {loading: false, error: action.payload};
        case TAYTRANG_DONHANG:
            return {};
        default:
            return state;
    }
}

export const ChiTietsDonHangReducers = (state = { loading: true }, action) => {
    switch (action.type) {
        case CHITIET_DONHANG_REQUEST:
            return {loading: true};
        case CHITIET_DONHANG_THANHCONG:
            return {loading: false, donhang: action.payload};
        case CHITIET_DONHANG_THATBAI:
            return {loading: false, error: action.payload}
        default:
            return state;
    };
}

export const ThanhToanDonHangReducers = (state = {}, action) => {
    switch(action.type){
        case THANHTOAN_DONHANG_REQUEST:
            return { loading: true };
        case THANHTOAN_DONHANG_THANHCONG:
            return { loading: false, success:true };
        case THANHTOAN_DONHANG_THATBAI:
            return { loading: false, error: action.payload };
        case TAYTRANG_THANHTOAN_DONHANG:
            return {};
        default:
            return state;
    };
}

export const DanhSachDonHangReducers = (state = { donhangs: [] }, action) => {
    switch(action.type){
        case DANHSACH_DONHANG_REQUEST:
            return { loading: true };
        case DANHSACH_DONHANG_THANHCONG:
            return { loading: false, donhangs: action.payload };
        case DANHSACH_DONHANG_THATBAI:
            return { loading: false, error: action.payload };
        default:
            return state;
    };
}

export const DanhSachDonHangAdminReducers = (state = { donhangs: [] }, action) => {
  switch (action.type) {
    case DANHSACH_DONHANG_ADMIN_REQUEST:
      return { loading: true };
    case DANHSACH_DONHANG_ADMIN_THANHCONG:
      return { loading: false, donhangs: action.payload };
    case DANHSACH_DONHANG_ADMIN_THATBAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const XoaDonHangReducers = (state = {}, action) => {
  switch (action.type) {
    case XOA_DONHANG_REQUEST:
      return { loading: true };
    case XOA_DONHANG_THANHCONG:
      return { loading: false, success: true };
    case XOA_DONHANG_THATBAI:
      return { loading: false, error: action.payload };
    case XOA_DONHANG_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const GiaoHangReducers = (state = {}, action) => {
  switch (action.type) {
    case GIAO_DONHANG_REQUEST:
      return { loading: true };
    case GIAO_DONHANG_THANHCONG:
      return { loading: false, success: true };
    case GIAO_DONHANG_THATBAI:
      return { loading: false, error: action.payload };
    case GIAO_DONHANG_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const ThongKeDonHangReducers = (
  state = { loading: true, thongke: {} },
  action
) => {
  switch (action.type) {
    case THONGKE_DONHANG_REQUEST:
      return { loading: true };
    case THONGKE_DONHANG_THANHCONG:
      return { loading: false, thongke: action.payload };
    case THONGKE_DONHANG_THATBAI:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};