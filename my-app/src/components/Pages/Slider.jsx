// import images 
import Watch1 from '../../assets/Watch1.jpg'
import Watch3 from '../../assets/Watch3.jpg'
import Tshirt from '../../assets/Tshirt.jpg'
import Shoes from '../../assets/Shoes.jpg'
import Headphone from '../../assets/Headphone.jpg'
import Kurti from '../../assets/Kurti.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const Slider = () => {


    const products = [
  { id: 1, name: "Cool T-Shirt", price: "₹999", img: Tshirt },
  { id: 2, name: "Running Shoes", price: "₹2,499", img: Shoes },
  { id: 3, name: "Wireless Headphones", price: "₹3,999", img: Headphone },
  { id: 4, name: "Ladies Kurti", price: "₹4,999", img: Kurti },
  { id: 5, name: "Casual Watch", price: "₹2,999", img: Watch3 },
  { id: 6, name: "Smart Watch", price: "₹1,599", img: Watch1 },
];
    
    return (
        <>
            <div className="container my-5">
      <h2 className="text-center mb-4">Modern & Trendy</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={100}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-5"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="card product-card border-0 shadow-sm text-center p-3">
              <div className="img-container mb-3">
                <img src={product.img} alt={product.name} className="img-fluid rounded" />
              </div>
              <h5 className="fw-bold">{product.name}</h5>
              <p className="text-muted">{product.price}</p>
              <button className="btn btn-danger btn-add-to-cart w-100 py-2 rounded-pill">
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

        </>
    )
}

export default Slider;
