const { SANPHAM_DANHSACH_REQUEST, SANPHAM_DANHSACH_THANHCONG, SANPHAM_DANHSACH_THATBAI, SANPHAM_CHITIET_REQUEST, SANPHAM_CHITIET_THANHCONG, SANPHAM_CHITIET_THATBAI, TAO_SANPHAM_REQUEST, TAO_SANPHAM_THANHCONG, TAO_SANPHAM_THATBAI, TAO_SANPHAM_TAYTRANG, CAPNHAT_SANPHAM_REQUEST, CAPNHAT_SANPHAM_THANHCONG, CAPNHAT_SANPHAM_THATBAI, CAPNHAT_SANPHAM_TAYTRANG, XOA_SANPHAM_REQUEST, XOA_SANPHAM_THANHCONG, XOA_SANPHAM_THATBAI, XOA_SANPHAM_TAYTRANG, REVIEW_SANPHAM_REQUEST, REVIEW_SANPHAM_THANHCONG, REVIEW_SANPHAM_THATBAI, REVIEW_SANPHAM_TAYTRANG } = require('../constants/SanPhamConstants')

export const DanhSachSanPhamReducer = ( state = { loading:true, sanphams: [] }, action) => {
    switch (action.type) {
        case SANPHAM_DANHSACH_REQUEST:
            return {loading: true};
        case SANPHAM_DANHSACH_THANHCONG:
            return { loading: false, sanphams: action.payload };
        case SANPHAM_DANHSACH_THATBAI:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ChiTietSanPhamReducer = (state = { loading: true }, action) => {
    switch (action.type){
        case SANPHAM_CHITIET_REQUEST:
            return {loading: true};
        case SANPHAM_CHITIET_THANHCONG:
            return { loading: false, sanpham: action.payload };
        case SANPHAM_CHITIET_THATBAI:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}

export const TaoSanPhamReducers = (state = {}, action) => {
  switch (action.type) {
    case TAO_SANPHAM_REQUEST:
      return { loading: true };
    case TAO_SANPHAM_THANHCONG:
      return { loading: false, success: true, sanpham: action.payload };
    case TAO_SANPHAM_THATBAI:
      return { loading: false, error: action.payload };
    case TAO_SANPHAM_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const CapNhatSanPhamReducers = (state = {}, action) => {
  switch (action.type) {
    case CAPNHAT_SANPHAM_REQUEST:
      return { loading: true };
    case CAPNHAT_SANPHAM_THANHCONG:
      return { loading: false, success: true };
    case CAPNHAT_SANPHAM_THATBAI:
      return { loading: false, error: action.payload };
    case CAPNHAT_SANPHAM_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const XoaSanPhamReducers = (state = {}, action) => {
  switch (action.type) {
    case XOA_SANPHAM_REQUEST:
      return { loading: true };
    case XOA_SANPHAM_THANHCONG:
      return { loading: false, success: true };
    case XOA_SANPHAM_THATBAI:
      return { loading: false, error: action.payload };
    case XOA_SANPHAM_TAYTRANG:
      return {};
    default:
      return state;
  }
};

export const TaoReviewSanPhamReducers = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_SANPHAM_REQUEST:
      return { loading: true };
    case REVIEW_SANPHAM_THANHCONG:
      return { loading: false, success: true, review: action.payload };
    case REVIEW_SANPHAM_THATBAI:
      return { loading: false, error: action.payload };
    case REVIEW_SANPHAM_TAYTRANG:
      return {};
    default:
      return state;
  }
};