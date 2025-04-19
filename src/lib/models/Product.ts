// models/Product.ts
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    type: String,
    enum: ["new-arrival", "top-selling", "related"],
  },
  price: Number,
  image: String,
  stock: Number,
  rating: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
