import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from "@mui/material";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (!userData?._id) return;

        axios
            .get(`http://localhost:9000/api/my-orders/${userData._id}`)
            .then(res => {
                if (res.data.success) {
                    setOrders(res.data.orders);
                }
            })
            .catch(err => console.log(err));
    }, [userData?._id]);

    return (
        <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
            <Typography variant="h4" gutterBottom>
                My Orders
            </Typography>

            {orders.length === 0 ? (
                <Typography>No orders found</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total Price</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orders.map(order => (
                                <TableRow key={order._id}>
                                    <TableCell>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <img
                                                src={`http://localhost:9000/img/${order.productId?.pic}`}
                                                alt=""
                                                style={{ width: 40, marginRight: 10 }}
                                            />
                                            {order.productId?.title}
                                        </Box>
                                    </TableCell>

                                    <TableCell>{order.quantity}</TableCell>
                                    <TableCell>₹{order.totalAmount}</TableCell>

                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            color={order.status === "Paid" ? "success" : "warning"}
                                        />
                                    </TableCell>

                                    <TableCell>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default MyOrders;
