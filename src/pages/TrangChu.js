import React,{useEffect} from 'react'
import Sanpham from '../components/Sanpham'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import {useDispatch, useSelector} from 'react-redux'
import {DanhSachSanPhams} from '../actions/SanPhamActions'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

export default function TrangChu() {
    const dispatch = useDispatch();
    const DanhSachSanPham = useSelector((state) => state.DanhSachSanPham)
    const { loading, error, sanphams} = DanhSachSanPham
    useEffect(() => {
        dispatch(DanhSachSanPhams())
    }, [dispatch])
    return (
        <div>
            <h2>San Pham Ban Chay</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                <Carousel showArrows autoPlay showThumbs={false}>
                    {sanphams.map((sp) => (
                    <div key={sp._id}>
                        <Link to={`/sanpham/${sp._id}`}>
                        <img src={sp.hinhanh} alt={sp.ten} />
                        <p>{sp.ten}</p>
                        </Link>
                    </div>
                    ))}
                </Carousel>
                </>
            )}
            <h2>Danh Sach San Pham</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
            <>
                {sanphams.length === 0 && <MessageBox>No Product Found</MessageBox>}
                <div className="row center">
                    {sanphams.map((sanpham) => (
                    <Sanpham key={sanpham._id} sanpham={sanpham}></Sanpham>
                    ))}
                </div>
            </>
            )}
        </div>
    )
}
