import React,{useEffect} from 'react'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux';
import { TaoSanPham ,DanhSachSanPhams, XoaSanPham } from '../actions/SanPhamActions';
import { TAO_SANPHAM_TAYTRANG, XOA_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';

export default function DanhSachSanPham(props) {
    const danhsachsanpham = useSelector((state) => state.DanhSachSanPham);
    const { loading, error, sanphams } = danhsachsanpham;
    const taosanpham = useSelector((state) => state.TaoSanPham);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        sanpham: createdProduct,
    } = taosanpham;
    const xoasanpham = useSelector((state) => state.XoaSanPham);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = xoasanpham;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successCreate) {
            dispatch({ type: TAO_SANPHAM_TAYTRANG });
            props.history.push(`/sanpham/${createdProduct._id}/sua`);
        }
        if (successDelete) {
            dispatch({ type: XOA_SANPHAM_TAYTRANG });
        }
        dispatch(DanhSachSanPhams());
    }, [createdProduct, dispatch, props.history, successCreate, successDelete]);
    const Xoane = (sanpham) => {
        if (window.confirm('Co Chac La Muon Xoa Khong Fen?')) {
            dispatch(XoaSanPham(sanpham._id));
        }
    }
    const Taone = () => {
        dispatch(TaoSanPham());
    };
    return (
        <div>
            <div className="row">
                <h1>SanPhams</h1>
                <button type="button" className="primary" onClick={Taone}>
                Tao SanPham
                </button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

            
            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>TEN</th>
                    <th>GIA</th>
                    <th>LOAI</th>
                    <th>THUONGHIEU</th>
                    <th>HANHDONG</th>
                    </tr>
                </thead>
                <tbody>
                    {sanphams.map((product) => (
                    <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.ten}</td>
                        <td>{product.gia}</td>
                        <td>{product.loai}</td>
                        <td>{product.thuonghieu}</td>
                        <td>
                        <button
                            type="button"
                            className="small"
                            onClick={() =>
                            props.history.push(`/sanpham/${product._id}/sua`)
                            }
                        >
                            Sua
                        </button>
                        <button
                            type="button"
                            className="small"
                            onClick={() => Xoane(product)}
                        >
                            Xoa
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>
    )
}
