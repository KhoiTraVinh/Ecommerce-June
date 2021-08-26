import React,{useState} from 'react'
import CheckOut from '../components/CheckOut'
import {useDispatch, useSelector} from 'react-redux';
import { LuuPhuongThucThanhToan } from '../actions/GioHangActions'

export default function ThanhToan(props) {
    const giohang = useSelector((state) => state.GioHang);
    const { ThongTinGiaoHang } = giohang;
    if(!ThongTinGiaoHang.diachi)
    {
        props.history.push('/giaohang');
    }
    const [PhuongThucThanhToan, setPhuongThucThanhToan] = useState('PayPal')
    const dispatch = useDispatch();
    const ThanhToanne = (e) => {
        e.preventDefault();
        dispatch(LuuPhuongThucThanhToan(PhuongThucThanhToan));
        props.history.push('/donhang');
    }
    return (
        <div>
            <CheckOut step1 step2 step3></CheckOut>
            <form className="form" onSubmit={ThanhToanne}>
                <div>
                    <h1>Phuong Thuc Thanh Toan</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={(e) => setPhuongThucThanhToan(e.target.value)}/>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div>
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod" required onChange={(e) => setPhuongThucThanhToan(e.target.value)}/>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">Tiep Tuc</button>
                </div>
            </form>
        </div>
    )
}
