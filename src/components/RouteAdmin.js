import React from 'react'
import { useSelector } from 'react-redux'
import {Redirect, Route} from 'react-router-dom'

export default function RouteAdmin({component: Component, ...rest}) {
    const thongtinnguoidung = useSelector((state) => state.DangNhap);
    const {ThongTinKhachHang} = thongtinnguoidung;
    return (
        <Route
            {...rest}
            render = {(props) =>
                ThongTinKhachHang && ThongTinKhachHang.isAdmin ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/DangNhap"/>
                )
            }></Route>
    )
}
