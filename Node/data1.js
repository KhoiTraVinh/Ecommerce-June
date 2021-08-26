import bcrypt from 'bcryptjs';
const data = {
    users: [
        {
            name: 'Khoi',
            email: 'thienkhoiduong@gmail.com',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: true,
        },
        {
            name: 'sang',
            email: 'sangaaa@gmail.com',
            password: bcrypt.hashSync('123456', 8),
            isAdmin: false,
        },
    ],
    sanphams: [
        {
            ten: 'KhoiDepTrai',
            loai: 'TraVinh',
            hinhanh: '/images/p1.png',
            gia: 79,
            countInStock: 3,
            thuonghieu: 'metmoi',
            rating: 4.5,
            numReviews: 10,
            mota: 'rat dep trai'
        },
        {
            ten: 'KhoiDepTrai4',
            loai: 'TraVinh',
            hinhanh: '/images/p4.png',
            gia: 109,
            countInStock: 10,
            thuonghieu: 'metmoi',
            rating: 5,
            numReviews: 10,
            mota: 'rat dep trai'
        },
        {
            ten: 'KhoiDepTrai1',
            loai: 'TraVinh',
            hinhanh: '/images/p2.png',
            gia: 89,
            countInStock: 0,
            thuonghieu: 'metmoi',
            rating: 4.0,
            numReviews: 10,
            mota: 'rat dep trai'
        },
        {
            ten: 'KhoiDepTrai2',
            loai: 'TraVinh',
            hinhanh: '/images/p3.png',
            gia: 99,
            countInStock: 7,
            thuonghieu: 'metmoi',
            rating: 3.5,
            numReviews: 12,
            mota: 'rat dep trai'
        },
        {
            ten: 'KhoiDepTrai3',
            loai: 'TraVinh',
            hinhanh: '/images/p5.png',
            gia: 209,
            countInStock: 5,
            thuonghieu: 'metmoi',
            rating: 4.5,
            numReviews: 18,
            mota: 'rat dep trai'
        }
    ]
}
export default data