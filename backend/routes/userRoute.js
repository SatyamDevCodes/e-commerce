import express from 'express';
import jwt from "jsonwebtoken";
import { userModel, AddToCartModel, productModel } from '../models/table.js'
const router = express.Router();


// user register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, contact } = req.body;

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      res.json({
        code: 400,
        message: "User already exist.",
        data: isExist
      })
    } else {
      const data = new userModel({ name, email, password, contact });
      const result = await data.save();
      res.json({
        code: 200,
        message: "User Register  Successfully...",
        data: result
      })
    }
  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error",
      data: ''
    })
  }
})


// user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        code: 400,
        message: "User not found"
      });
    }
    else if (user.password !== password) {
      return res.status(400).json({
        code: 400,
        message: "Invalid password"
      });
    }
    else {
      return res.status(200).json({
        code: 200,
        message: "Login successful",
        data: user
      });
    }

  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Server error"
    });
  }
});


// Add to cart
router.post('/cart', async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const isAdded = await AddToCartModel.findOne({ productId })
    if (isAdded) {
      res.json({
        code: 400,
        message: "Product Already Added.",
        data: isSold
      })
    } else {
      const data = new AddToCartModel({ userId, productId });
      const result = await data.save();
      res.json({
        code: 200,
        message: "Product Added Successfully..",
        data: result
      })
    }
  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error",
      data: ''
    })
  }
});

// Show in cart 
router.post('/add-to-cart', async (req, res) => {
  try {
    const { userId } = req.body;
    const raw = await AddToCartModel.find({ userId });
    const finalData = await Promise.all(
      raw?.map(async (item) => {
        const productData = await productModel.findOne({ _id: item?.productId });

        return {
          _id: item?._id,
          productId: productData?._id,
          title: productData?.title,
          price: productData?.price,
          discount: productData?.discount,
          category: productData?.category,
          description: productData?.description,
          pic: productData?.pic
        }
      })
    )
    res.json({
      code: 200,
      message: "Data fetched successfully.",
      data: finalData
    })

  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error",
      data: ''
    })
  }
});

// Remove Product form cart
router.post('/remove-cart', async (req, res) => {
  try {
    const { _id } = req.body;
    const remove = await AddToCartModel.findByIdAndDelete({ _id });
    if (remove) {
      res.json({
        code: 200,
        message: "Product Removed Successfully!",
        data: ''
      })
    } else {
      res.json({
        code: 400,
        message: "Product Remove Failed.",
        data: ''
      })
    }
  } catch (err) {
    res.json({
      code: 500,
      message: "Internal Server Error.",
      data: ''
    })
  }
});

// My order list
router.get("/my-orders/:userId", async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.params.userId);

        const orders = await OrderModel
            .find({ userId })
            .populate("productId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("MY ORDERS ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});



export default router;