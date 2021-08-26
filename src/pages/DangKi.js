import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import {DangKi} from '../actions/KhachHangActions'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'

export default function DangKiTrang(props) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [xacnhanPassword, setxacnhanPassword] = useState('');

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const ThongTinDangKi = useSelector((state) => state.DangKi);
    const { ThongTinKhachHang, loading, error } = ThongTinDangKi


    const dispatch = useDispatch();
    const DangKine = (e) => {
        e.preventDefault();
        if(password !== xacnhanPassword)
        {
            alert('Mat Khau Va Xac Nhan Mat Khau Khong Trung Khop')
        }
        else
        {
            dispatch(DangKi(name, email, password));
        }
        
    };

    useEffect(() => {
        if(ThongTinKhachHang) {
            props.history.push(redirect);
        }
    },[props.history, redirect, ThongTinKhachHang])
    return (
        <div>
            <form className="form" onSubmit={DangKine}>
                <div>
                    <h1>Dang Ki</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Ten</label>
                    <input type="text" id="name" placeholder="Nhap Ten" required onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Nhap Email" required onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">PassWord</label>
                    <input type="password" id="password" placeholder="Nhap PassWord" required onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="xacnhanPassword">Xac Nhan Mat Khau</label>
                    <input type="password" id="xacnhanPassword" placeholder="Xac Nhan Mat Khau" required onChange={(e) => setxacnhanPassword(e.target.value)}></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Dang Ki</button>
                </div>
                <div>
                    <label/>
                    <div>
                        Quay Lai Dang Nhap? <Link to={`/DangNhap?redirect=${redirect}`}>Dang Nhap</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
