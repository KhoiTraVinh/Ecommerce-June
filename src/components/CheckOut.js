import React from 'react'

export default function CheckOut(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Dang Nhap</div>
            <div className={props.step2 ? 'active' : ''}>Giao Hang</div>
            <div className={props.step3 ? 'active' : ''}>Thanh Toan</div>
            <div className={props.step4 ? 'active' : ''}>Don Hang</div>
        </div>
    )
}
