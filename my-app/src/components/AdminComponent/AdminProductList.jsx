import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const AdminProductList = () => {


  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    const res = await axios.get("http://localhost:9000/api/products");
    if (res?.data?.code == 200) {
      setProducts(res.data?.data);
    }
  };

  // delete product 
  const handleDeleteProduct = async (_id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {

     const response = await axios.post('http://localhost:9000/api/delete-product', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "Delete Product.",
            text: response?.data?.message,
            icon: "success",
          })
          fetchProducts();
        }else{
          Swal.fire({
            title: "Delete Product.",
            text: response?.data?.message,
            icon: "error",
          })
        }
      }
    });
  }



  return (<>
    <div className="container my-5">
      <h3 className="fw-bold mb-4">Products</h3>

      <div className="row g-4">
        {products.map((item, index) => {
          return (<>
          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={index}>
            <div className="card h-100 shadow-sm border-0 product-card">

              <div className="position-relative">
                <img
                  src={`http://localhost:9000/img/${item?.pic}`}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                {item.discount && (
                  <span className="badge bg-danger text-white position-absolute top-0 start-0 m-2">
                    {item.discount}% OFF
                  </span>
                )}
              </div>

              <div className="card-body">
                <h6 className="fw-bold">{item.title}</h6>
                <p className="text-muted mb-1">{item.category}</p>

                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold text-primary">₹{item.price}</span>
                  <button onClick={()=>handleDeleteProduct(item?._id)} className="btn btn-outline-primary btn-sm">
                    Delete
                  </button>
                </div>
              </div>

            </div>
          </div>
          </>)
        })}
      </div>
    </div>
  </>);
};

export default AdminProductList;
