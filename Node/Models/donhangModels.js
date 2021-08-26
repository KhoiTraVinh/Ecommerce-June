import database from 'mongoose'

const donhangSchema = new database.Schema({
    ChiTietDonHang: [
        {
            ten: {type:String, required: true},
            sl: {type:String, required: true},
            hinhanh: {type:String, required: true},
            gia: {type:String, required: true},
            sanpham: {
                type: database.Schema.Types.ObjectId,
                ref: 'Sanpham',
                required: true,
            },
        },
    ],
    ThongTinGiaoHang: {
        hoten: {type:String, required: true},
        diachi: {type:String, required: true},
        phuong: {type:String, required: true},
        quan: {type:String, required: true},
        sodienthoai: {type:String, required: true},
        lat: Number,
        lng: Number,
    },
    PhuongThucThanhToan: {type:String, required: true},
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: {type:Number, required: true},
    shippingPrice: {type:Number, required: true},
    taxPrice: {type:Number, required: true},
    totalPrice: {type:Number, required: true},
    user: {type: database.Schema.Types.ObjectId, ref: 'User', required: true},
    isPaid: {type:Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type:Boolean, default: false},
    deliveredAt: {type: Date},
    
},
{
    timestamps: true,
}
);

const DonHang = database.model('DonHang', donhangSchema);
export default DonHang;