import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, IconButton, Typography, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Swal from "sweetalert2";

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:9000/api/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleIncrease = () => setQuantity(q => q + 1);
    const handleDecrease = () => quantity > 1 && setQuantity(q => q - 1);

    // 🔹 Razorpay Dynamic Loader
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // 🔹 PLACE ORDER FUNCTION (FINAL)
    const placeOrder = async () => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (!user?._id) {
            navigate("/login");
            return;
        }

        const sdkLoaded = await loadRazorpay();
        if (!sdkLoaded) {
            Swal.fire("Error", "Razorpay SDK failed to load", "error");
            return;
        }

        try {
            // 1️⃣ Create Razorpay order from backend
            const { data } = await axios.post(
                "http://localhost:9000/api/create-order",
                { amount: product.price * quantity }
            );

            const options = {
                key: "rzp_test_S9kwgEIGFYzwbS",
                amount: data.amount,
                currency: "INR",
                name: "My Ecommerce",
                description: "Product Purchase",
                order_id: data.id,

                handler: async function (response) {
                    // 2️⃣ Verify payment & save order
                    await axios.post("http://localhost:9000/api/verify-payment", {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        orderData: {
                            userId: user._id,
                            productId: id,
                            quantity: quantity,
                            totalAmount: product.price * quantity
                        }
                    });

                    Swal.fire("Success 🎉", "Order placed successfully!", "success");
                    navigate("/my-orders");
                },

                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (error) {
            console.error(error);
            Swal.fire("Error ❌", "Payment failed", "error");
        }
    };

    if (!product) return <h2>Loading...</h2>;

    return (
        <Box sx={{ p: 3, maxWidth: "600px", mx: "auto", textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>Checkout</Typography>

            <img
                src={`http://localhost:9000/img/${product.pic}`}
                alt={product.title}
                style={{ width: "200px", borderRadius: "10px" }}
            />

            <Typography variant="h5" mt={2}>{product.title}</Typography>
            <Typography color="text.secondary">{product.description}</Typography>

            <Typography variant="h6" color="primary" mt={1}>
                Price: ₹{product.price}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
                <IconButton onClick={handleDecrease} color="error">
                    <RemoveIcon />
                </IconButton>

                <Typography mx={2} fontWeight="bold">{quantity}</Typography>

                <IconButton onClick={handleIncrease} color="success">
                    <AddIcon />
                </IconButton>
            </Box>

            <Typography variant="h5" mt={2}>
                Total: ₹{product.price * quantity}
            </Typography>

            <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                onClick={placeOrder}
            >
                Pay & Place Order
            </Button>
        </Box>
    );
};

export default Checkout;
