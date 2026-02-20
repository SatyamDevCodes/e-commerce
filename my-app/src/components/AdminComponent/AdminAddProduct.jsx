import React, { useState } from "react";
import axios from "axios";

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    discount: "",
    pic: "",
    description: ""
  });

  const handleChange = (e) => {
    if(e.target.name==="pic"){
      setProduct({...product,pic:e.target.files[0]});
    } else{
      setProduct({...product,[e.target.name]:e.target.value});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData=new FormData();
    formData.append("title",product.title);
    formData.append("price",product.price);
    formData.append("category",product.category);
    formData.append("discount",product.discount);
    formData.append("description",product.description);
    formData.append("pic",product.pic);

    try {
      await axios.post("http://localhost:9000/api/add-product", formData,{
        headers:{"Content-Type":"multipart/form-data"}
      });
      alert("Product added successfully");
    } catch (error) {
      console.error(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center fs-4 fw-bold">
              Add New Product
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">Product Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Discount (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="discount"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option>Men</option>
                    <option>Women</option>
                    <option>Mobiles</option>
                    <option>Watches</option>
                    <option>Kids</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="pic"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Add Product
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddProduct;
