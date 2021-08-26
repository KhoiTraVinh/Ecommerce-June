import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {DangNhap} from '../actions/KhachHangActions'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'

export default function DangNhapTrang(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const ThongTinDangNhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang, loading, error } = ThongTinDangNhap


    const dispatch = useDispatch();
    const DangNhapne = (e) => {
        e.preventDefault();
        dispatch(DangNhap(email, password));
    };

    useEffect(() => {
        if(ThongTinKhachHang) {
            props.history.push(redirect);
        }
    },[props.history, redirect, ThongTinKhachHang])
    return (
        <div>
            <form className="form" onSubmit={DangNhapne}>
                <div>
                    <h1>Dang Nhap</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Nhap Email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">PassWord</label>
                    <input type="password" id="password" placeholder="Nhap PassWord" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Dang Nhap</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Thanh Vien Moi? <Link to={`/DangKi?redirect=${redirect}`}>Dang Ki Tai Khoan</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
