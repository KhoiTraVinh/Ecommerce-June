import React from 'react'
import Rating from './Rating'
import { Link } from 'react-router-dom'

export default function Sanpham(props) {
    var {sanpham} = props
    return (
        <div key={sanpham._id} className="card">
                        <Link to={`/sanpham/${sanpham._id}`}>
                            <img className="medium" src={sanpham.hinhanh} alt={sanpham.ten}/>
                        </Link>
                        <div className="card-body">
                            <Link to={`/sanpham/${sanpham._id}`}>
                                <h2>{sanpham.ten}</h2>
                            </Link>
                            <Rating rating={sanpham.rating} numReviews={sanpham.numReviews}/>
                            <div className="Gia">
                                ${sanpham.gia}
                            </div>
                        </div>
                    </div>
    )
}
