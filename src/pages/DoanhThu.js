import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { ThongKeDonHang } from '../actions/DonHangActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DoanhThu() {
  const thongkedonhang = useSelector((state) => state.ThongKeDonHang);
  const { loading, thongke, error } = thongkedonhang;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ThongKeDonHang());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Thong Ke</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> TaiKhoan
                </span>
              </div>
              <div className="summary-body">{thongke.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> DonHang
                </span>
              </div>
              <div className="summary-body">
                {thongke.orders[0] ? thongke.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> DoanhThu
                </span>
              </div>
              <div className="summary-body">
                $
                {thongke.orders[0]
                  ? thongke.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>DoanhThu</h2>
              {thongke.dailyOrders.length === 0 ? (
                <MessageBox>Chua Ban</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Dang Tai So Lieu</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...thongke.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Loai</h2>
            {thongke.productCategories.length === 0 ? (
              <MessageBox>Khong Loai</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Dang Tai So Lieu</div>}
                data={[
                  ['Category', 'Products'],
                  ...thongke.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}