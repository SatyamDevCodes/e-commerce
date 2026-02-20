import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import NavBar from './components/Pages/NavBar.jsx';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Pages/Home';
import Slider from '../src/components/Pages/Slider.jsx';
import ProductList from './components/Pages/ProductList.jsx'
import ProductDetails from './components/Pages/ProductDetails.jsx';
import Testimonial from '../src/components/Pages/Testimonial.jsx';
import Footer from '../src/components/Pages/Footer.jsx';
import ContactUs from './components/Pages/ContactUs.jsx';
import UserSignUp from './components/Pages/UserSignUp.jsx';
import Login from './components/Pages/Login.jsx';
import AdminAddProduct from './components/AdminComponent/AdminAddProduct.jsx'
import AdminContactUsList from './components/AdminComponent/AdminContactUsList.jsx';
import AdminProductList from './components/AdminComponent/AdminProductList.jsx';
import AdminSoldProduct from './components/AdminComponent/AdminSoldProduct.jsx';
import UserList from './components/AdminComponent/UserList.jsx';
import UserCart from './components/UserComponent/UserCart.jsx';
import UserProfile from './components/UserComponent/UserProfile.jsx';
import Checkout from './components/Pages/Checkout.jsx';
import MyOrders from './components/UserComponent/MyOrders.jsx';
import { useEffect, useState } from 'react';





function App() {


  const location = useLocation()
  const [userData, setUserData] = useState(null);
  // Role base authentication
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUserData(user);
  }, [location]);

  return (
    <>

      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/feedback' element={<Testimonial />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/register' element={<UserSignUp />} />
        <Route path='/login' element={<Login />} />

        {/* admin Section  */}
        {userData?.userType == "admin" && <>
          <Route path='/admin-add' element={<AdminAddProduct />} />
          <Route path='/admin-list' element={<AdminProductList />} />
          <Route path='/admin-sold' element={<AdminSoldProduct />} />
          <Route path='/admin-user' element={<UserList />} />
          {/* <Route path='/admin-profile' element={<AdminProfile />} /> */}
          <Route path='/admin-contact' element={<AdminContactUsList />} />
        </>}

        {/* User Route */}
        {userData?.userType == "user" && <>
          <Route path='/user-cart' element={<UserCart />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/checkout/:id' element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrders />} />

        </>}

      </Routes>

    </>
  )
}

export default App;

