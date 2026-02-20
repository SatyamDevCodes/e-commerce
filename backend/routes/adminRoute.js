import express from 'express';
import path from 'path';
import { OrderModel, productModel } from '../models/table.js';
const adminRoute = express.Router();

// admin add product api 
adminRoute.post("/add-product", async (req, res) => {
    try {
        const { title, price, discount, category, description } = req.body;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        const pic = req.files.pic;
        const fileName = Date.now() + "_" + pic.name;
        const uploadPath = "./uploads/" + fileName;

        pic.mv(uploadPath, async (err) => {
            if (err) return res.status(500).send(err);
        })

        const newProduct = new productModel({ title, price, discount, category, description, pic: fileName });
        const result = await newProduct.save();
        return res.status(200).json({
            code: 200,
            message: "Product added successfully",
            data: result
        });

    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Server error",
            error: error.message
        });
    }
});


// product list on home page api 
adminRoute.get("/products", async (req, res) => {
    try {
        const products = await productModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            code: 200,
            message: "Success",
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Server error"
        });
    }
});


//delete product 
adminRoute.post('/delete-product', async (req, res) => {
    try {
        const { _id } = req.body;
        const deleteProduct = await productModel.findByIdAndDelete({ _id });
        if (deleteProduct) {
            res.json({
                code: 200,
                message: "Product Deleted Successfully",
                data: ''
            })
        } else {
            res.json({
                code: 400,
                message: "Product Delete Failed!",
                data: ''
            })
        }
    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error!",
            data: ''
        })
    }
})


// Product details 
adminRoute.get("/:id", async(req, res)=>{
  try{
    const product = await productModel.findById(req.params.id);
  if(!product){
    return res.status(404).json({
        message:"Product Not Found !",
    });
  }
  res.json(product);
  } catch(error){
    res.status(500).json({
        message:'Server Error', error
    });
  }
});



// Checkout functionality
adminRoute.post("/order", async (req, res) => {
    try {
        const { productId, quantity, totalAmount } = req.body;

        const newOrder = new OrderModel({
            productId,
            quantity,
            totalAmount
        });

        await newOrder.save();

        res.status(201).json({ 
            success: true, 
            message: "Order placed successfully!", 
            order: newOrder 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Order failed in backend" 
        });
    }
});


//  (Cart Checkout)
adminRoute.post("/bulk-order", async (req, res) => {
    try {
        const { items, totalAmount } = req.body; 
        
        const newOrders = await OrderModel.insertMany(items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            totalAmount: item.price * item.quantity
        })));

        res.status(201).json({ 
            success: true, 
            message: "All orders placed successfully!",
            orders: newOrders 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Bulk order failed" });
    }
});

export default adminRoute;