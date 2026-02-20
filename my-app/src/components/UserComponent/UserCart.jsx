import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const UserCart = () => {

  const navigate = useNavigate();
  // add to cart 
  const [cart, setCart] = useState([])
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const UserData = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.post('http://localhost:9000/api/add-to-cart', {
      userId: UserData?._id
    })
    if (response?.data?.code == 200) {
      setCart(response?.data?.data)
    }
  }

  // remove product from cart 
  const handleRemoveCartProduct = async (_id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

        const response = await axios.post('http://localhost:9000/api/remove-cart', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "Product Removed.",
            text: response?.data?.message,
            icon: "success",
          })
          fetchData();
        } else {
          Swal.fire({
            title: "Remove Product.",
            text: response?.data?.message,
            icon: "error",
          })
        }
      }
    });
  };

  // Summary Section ka Button checkout
  const handleCartCheckout = async () => {
    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item._id,
          quantity: 1,
          price: item.price
        })),
        totalAmount: totalPrice
      };

      const res = await axios.post("http://localhost:9000/api/bulk-order", orderData);
      if (res.data.success) {
        Swal.fire("Success", "Aapka poora cart order ho gaya hai!", "success");
        setCart([]); // Cart khali kar dein
      }
    } catch (err) {
      Swal.fire("Error", "Order fail ho gaya", "error");
    }
  };



  // Cart ki Total product ki Quantity & Price 
  const totalProduct = cart.length;
  const totalPrice = cart.reduce((acc, item) => {
    return acc + (item.price || 0);
  }, 0);


  return (
    <div className="container mt-5">
      <h2>Your Shopping Cart</h2>
      <hr />

      {cart.length === 0 ? (
        <div className="alert alert-info">Aapka cart khali hai!</div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={`http://localhost:9000/img/${item?.pic}`} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
                      {item.title}
                    </td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemoveCartProduct(item?._id)}>Remove</button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm" onClick={() => navigate(`/checkout/${item._id}`)}>Buy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4>Summary</h4>
              <p>Total Items: {totalProduct} </p>
              <h5>Total Price: ₹{totalPrice} </h5>
              <button className="btn btn-success w-100 mt-3" onClick={handleCartCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;