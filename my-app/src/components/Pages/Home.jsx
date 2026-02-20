import Slider from './Slider.jsx';
import Products from './ProductList.jsx'
import Testimonial from './Testimonial.jsx';
import Footer from './Footer.jsx';
import Category from '../Header/Category';
import Hero from './Hero.jsx';

const Home = () => {
  return (
    <>
      <Category />
      <Hero />
      <Slider />
      <Products />
      <Testimonial />
      <Footer />
    </>
  )
}

export default Home;
