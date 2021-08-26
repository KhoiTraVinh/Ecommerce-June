import database from 'mongoose';


const reviewSchema = new database.Schema(
  {
    ten: { type: String, required: true },
    binhluan: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const sanphamSchema = new database.Schema({
    ten: { type: String, required: true, unique: true},
    hinhanh: { type: String, required: true},
    thuonghieu: { type: String, required: true},
    loai: { type: String, required: true},
    mota: { type: String, required: true},
    gia: { type: Number, required: true},
    countInStock: { type: Number, required: true},
    rating: { type: Number, required: true},
    numReviews: { type: Number, required: true},
    reviews: [reviewSchema],
},
{
    timestamps: true,
});

const Sanpham = database.model('Sanpham', sanphamSchema);

export default Sanpham;