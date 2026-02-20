import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    userType: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})
export const userModel = mongoose.model('users', userSchema);


// admin add product table 
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    pic: { type: String },
    description: { type: String },
}, { timestamps: true });

export const productModel = mongoose.model("Product", productSchema);


// add to cart
const AddToCartSchema = new mongoose.Schema({
    userId: { type: String },
    productId: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() }
})
export const AddToCartModel = mongoose.model('cart', AddToCartSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String
    },
    status: {
        type: String,
        default: "Paid"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const OrderModel = mongoose.model("orders", orderSchema);
