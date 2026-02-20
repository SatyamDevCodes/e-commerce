import React from 'react'
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




const ProductDetails = () => {

  
  const navigate=useNavigate();


  const {id}=useParams();
  const [product, setProduct]=useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:9000/api/${id}`)
    .then(res=>{
      console.log("Data Aa Gaya",res.data);
      setProduct(res.data)
    }).catch(err=>console.log(err));
  },[id]);

  if(!product){
    return <h2>Loading...</h2>;
  };
  




  const handleAddToCart = async (productId) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if(!userData?._id){
      navigate('/login')
      return
    }
    const response = await axios.post('http://localhost:9000/api/cart', { userId: userData?._id, productId });
    if (response?.data?.code == 200) {
      Swal.fire({
        title: "Add Product",
        text: response?.data?.message,
        icon: 'success'
      })
    } else {
      Swal.fire({
        title: "Add Product",
        text: response?.data?.message,
        icon: 'error'
      })
    }
  };


  return (
    <>
    <div className="container">
      <div className="product-details">
        <img src={`http://localhost:9000/img/${product?.pic}`} alt={product.title} />

        <div>
          <h1>{product.title}</h1>
          <h2>{product.price}</h2>
          <p>{product.description}</p>
          <Button className='add-cart' onClick={()=>{handleAddToCart(product?._id)}}>Add to Cart</Button>
          <Button className='buy-now' onClick={()=>navigate(`/checkout/${id}`)} variant='contained'>Buy</Button>
        </div>
      </div>
      </div>
    </>
  )
}

export default ProductDetails;
