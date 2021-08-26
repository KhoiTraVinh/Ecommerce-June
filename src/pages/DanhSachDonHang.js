import React,{useEffect} from 'react'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import {useDispatch, useSelector} from 'react-redux';
import {DanhSachDonHangne} from '../actions/DonHangActions'

export default function DanhSachDonHang(props) {
    const danhsachdonhang = useSelector((state) => state.DanhSachDonHang);
    const {loading, error, donhangs} = danhsachdonhang;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(DanhSachDonHangne());
    },[dispatch])
    return (
        <div>
            <h1>Danh Sach Don Hang</h1>
            {loading? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ma Don</th>
                            <th>Ngay</th>
                            <th>TongCong</th>
                            <th>ThanhToan</th>
                            <th>GiaoHang</th>
                            <th>HanhDong</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donhangs.map((donhang) => (
                            <tr key={donhang._id}>
                                <td>{donhang._id}</td>
                                <td>{donhang.createdAt.substring(0, 10)}</td>
                                <td>{donhang.totalPrice.toFixed(2)}</td>
                                <td>{donhang.isPaid ? donhang.paidAt.substring(0, 10) : 'Chua Thanh Toan'}</td>
                                <td>{donhang.isDelivered ? donhang.deliveredAt.substring(0, 10) : 'Chua Giao Hang'}</td>
                                <td><button type="button" className="small" onClick={() => {
                                    props.history.push(`/chitietdonhang/${donhang._id}`)
                                }}>Chi Tiet</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            }
        </div>
    )
}
