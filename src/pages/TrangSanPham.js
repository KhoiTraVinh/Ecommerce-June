import React, {useEffect, useState} from 'react'
import Rating from '../components/Rating'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {ChiTietSanPhams, TaoReView} from '../actions/SanPhamActions'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { REVIEW_SANPHAM_TAYTRANG } from '../constants/SanPhamConstants';

export default function TrangSanPham(props) {
    const dispatch = useDispatch();
    const sanphamid = props.match.params.id;
    const [sl, setSL] = useState(1);
    const ChiTietSanPham = useSelector((state) => state.ChiTietSanPham);
    const { loading, error, sanpham} = ChiTietSanPham

    const dangnhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang } = dangnhap;

    const reviewsanpham = useSelector((state) => state.ReViewSanPham);
    const {
        loading: loadingReviewCreate,
        error: errorReviewCreate,
        success: successReviewCreate,
    } = reviewsanpham;

    const [rating, setRating] = useState(0);
    const [binhluan, setComment] = useState('');

    useEffect(() => {
        if (successReviewCreate) {
            window.alert('Review Thanh Cong');
            setRating('');
            setComment('');
            dispatch({ type: REVIEW_SANPHAM_TAYTRANG });
        }
        dispatch(ChiTietSanPhams(sanphamid));
    },[dispatch, sanphamid, successReviewCreate]);
    const ThemVaoGio = () => {
        props.history.push(`/giohang/${sanphamid}?sl=${sl}`);
    };
    const ReViewne = (e) => {
        e.preventDefault();
        if (binhluan && rating) {
        dispatch(
            TaoReView(sanphamid, { rating, binhluan, ten: ThongTinKhachHang.name })
        );
        } else {
            alert('Nhap Binh Luan Va Rating');
        }
    };
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div>
                    <Link to="/">Tro Lai</Link>
                    <div className="row top">
                        <div className="col-2">
                            <img className="large" src={sanpham.hinhanh} alt={sanpham.ten}/>
                        </div>
                        <div className="col-1">
                            <ul>
                                <li>
                                    <h1>{sanpham.ten}</h1>
                                </li>
                                <li>
                                    <Rating rating={sanpham.rating} numReviews={sanpham.numReviews}/>
                                </li>
                                <li>
                                    Gia: ${sanpham.gia}
                                </li>
                                <li>
                                    MoTa:
                                    <p>{sanpham.mota}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <div className="row">
                                            <div>Gia</div>
                                            <div className="gia">${sanpham.gia}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Trang Thai</div>
                                            <div>
                                                {sanpham.countInStock > 0 ? (
                                                    <span className="success">Trong Kho</span>
                                                ) : (
                                                    <span className="danger">Het Hang</span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                    {sanpham.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>SL</div>
                                                    <div>
                                                        <select 
                                                        value={sl}
                                                        onChange={(e) => setSL(e.target.value)}>
                                                            {[...Array(sanpham.countInStock).keys()].map(
                                                                (x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                    {x+1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <button onClick={ThemVaoGio} className="primary block">Them vao gio hang</button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 id="reviews">Reviews</h2>
                        {sanpham.reviews.length === 0 && (
                        <MessageBox>Khong co review nao</MessageBox>
                        )}
                        <ul>
                        {sanpham.reviews.map((review) => (
                            <li key={review._id}>
                            <strong>{review.ten}</strong>
                            <Rating rating={review.rating} caption=" "></Rating>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.binhluan}</p>
                            </li>
                        ))}
                        <li>
                            {ThongTinKhachHang ? (
                            <form className="form" onSubmit={ReViewne}>
                                <div>
                                <h2>Viet 1 review cua khach hang</h2>
                                </div>
                                <div>
                                <label htmlFor="rating">Rating</label>
                                <select
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                >
                                    <option value="">Chon...</option>
                                    <option value="1">1- Rat Te</option>
                                    <option value="2">2- Te</option>
                                    <option value="3">3- Binh Thuong</option>
                                    <option value="4">4- Kha Tot</option>
                                    <option value="5">5- Tot</option>
                                </select>
                                </div>
                                <div>
                                <label htmlFor="comment">Binh Luan</label>
                                <textarea
                                    id="comment"
                                    value={binhluan}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                </div>
                                <div>
                                <label />
                                <button className="primary" type="submit">
                                    Dang
                                </button>
                                </div>
                                <div>
                                {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                {errorReviewCreate && (
                                    <MessageBox variant="danger">
                                    {errorReviewCreate}
                                    </MessageBox>
                                )}
                                </div>
                            </form>
                            ) : (
                            <MessageBox>
                                Vui Long <Link to="/DangNhap">Dang Nhap</Link> de thay review
                            </MessageBox>
                            )}
                        </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>  
    )
}
