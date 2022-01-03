import {BrowserRouter, Route} from 'react-router-dom'
import TrangChu from "./pages/TrangChu";
import TrangSanPham from "./pages/TrangSanPham";
import GioHang from "./pages/GioHang";
import DangNhap from "./pages/DangNhap";
import DangKi from "./pages/DangKi";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {DangXuat} from './actions/KhachHangActions'
import GiaoHang from './pages/GiaoHang'
import ThanhToan from './pages/ThanhToan'
import DonHang from './pages/DonHang'
import ChiTietDonHangne from './pages/ChiTietDonHang'
import DanhSachDonHang from './pages/DanhSachDonHang'
import ThongTinNguoiDung from './pages/ThongTinNguoiDung'
import RouteBiMat from './components/RouteBiMat'
import RouteAdmin from './components/RouteAdmin';
import DanhSachSanPham from './pages/DanhSachSanPham'
import CapNhatSanPhamTrang from './pages/CapNhapSanPham'
import DanhSachDonHangAdmins from './pages/DanhSachDonHangAdmin'
import TaiKhoan from './pages/TaiKhoan'
import TimKiem from './components/ThanhTimKiem'
import TraCuu from './pages/TraCuu'
import DoanhThu from './pages/DoanhThu'
import CapNhatTaiKhoan from './pages/CapNhatTaiKhoan'
import DanhSachVoucher from './pages/DanhsachVoucher'
import CapNhatVoucher from './pages/CapNhapVoucher';
import KhoHang from './pages/KhoHang';
function App() {
    const giohang = useSelector((state) => state.GioHang);
    const {ChiTietDonHang} = giohang;
    const ThongTinDangNhap = useSelector((state) => state.DangNhap);
    const { ThongTinKhachHang } = ThongTinDangNhap
    const dispatch = useDispatch();
    const Dangxuatne = () => {
        dispatch(DangXuat());
    }
  return (
    <BrowserRouter>
      <div className="Khung_Luoi">
              <header className="row">
                  <div>
                      <Link className="ThuongHieu" to="/">Khoine</Link>
                  </div>
                    <div>
                        <Route render={({ history }) => (<TimKiem history={history}></TimKiem>)}></Route>
                    </div>
                  <div>
                      <Link to="/Giohang">GioHang {ChiTietDonHang.length > 0 && (
                          <span className="badge">{ChiTietDonHang.length}</span>
                      )}</Link>
                      { ThongTinKhachHang ? (
                          <div className="dropdown">
                            <Link to="#">{ThongTinKhachHang.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                            <ul className="dropdown-content"> <li><Link to="/thongtinnguoidung">Profile</Link></li> <li><Link to="/danhsachdonhang">DonHang</Link></li><li><Link to="/chatvoishipper">Chat</Link></li><li><Link to="#Dangxuat" onClick={Dangxuatne}>Dang Xuat</Link></li></ul>
                          </div>
                      ) : (
                        <Link to="/DangNhap">DangNhap</Link>
                      )}
                      { ThongTinKhachHang && ThongTinKhachHang.isAdmin && (
                          <div className="dropdown">
                            <Link to="#admin">
                                Admin <i className="fa fa-caret-down"></i>
                            </Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/thongke">ThongKe</Link>
                                </li>
                                <li>
                                    <Link to="/danhsachsanpham">SanPham</Link>
                                </li>
                                <li>
                                    <Link to="/danhsachdonhangadmin">DonHang</Link>
                                </li>
                                <li>
                                    <Link to="/taikhoan">TaiKhoan</Link>
                                </li>
                                <li>
                                    <Link to="/voucher">Voucher</Link>
                                </li>
                            </ul>
                          </div>
                      )}    
                  </div>
              </header>
              <main>
              <Route path="/giohang/:id?" component={GioHang}></Route>
              <Route path="/sanpham/:id" component={TrangSanPham} exact></Route>
              <Route path="/DangNhap" component={DangNhap}></Route>
              <Route path="/DangKi" component={DangKi}></Route>
              <Route path="/giaohang" component={GiaoHang}></Route>
              <Route path="/thanhtoan" component={ThanhToan}></Route>
              <Route path="/donhang" component={DonHang}></Route>
              <Route path="/chitietdonhang/:id" component={ChiTietDonHangne}></Route>
              <Route path="/danhsachdonhang" component={DanhSachDonHang}></Route>
              <Route path="/sanpham/:id/sua" component={CapNhatSanPhamTrang} exact></Route>
              <Route path="/voucher/:id/sua" component={CapNhatVoucher} exact></Route>
              <Route path="/search/name/:name?" component={TraCuu} exact></Route>
              <RouteBiMat path="/thongtinnguoidung" component={ThongTinNguoiDung}></RouteBiMat>
              <RouteAdmin path="/danhsachsanpham" component={DanhSachSanPham}></RouteAdmin>
              <RouteAdmin path="/danhsachdonhangadmin" component={DanhSachDonHangAdmins}></RouteAdmin>
              <RouteAdmin path="/taikhoan" component={TaiKhoan}></RouteAdmin>
              <RouteAdmin path="/taikhoan/:id/sua" component={CapNhatTaiKhoan}></RouteAdmin>
              <RouteAdmin path="/thongke" component={DoanhThu}></RouteAdmin>
              <RouteAdmin path="/voucher" component={DanhSachVoucher}></RouteAdmin>
              <RouteAdmin path="/khohang" component={KhoHang}></RouteAdmin>
              <Route path="/" component={TrangChu} exact></Route>
              </main>
              <footer className="row center">
                  Create By KhoiDepTrai
              </footer>
          </div>
      </BrowserRouter>
  );
}

export default App;
