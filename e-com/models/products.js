import mongoose from "mongoose";
const { Schema, model, models} = require("mongoose");

const productSchema = new Schema ({
    name: String,
    descriptipn: String,
    price: Number,
    category: String,
    picture: String
});


const Product = models?.Product || model("Product", productSchema);

export default Product;

