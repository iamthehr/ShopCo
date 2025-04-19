// app/api/products/route.ts
import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
import Product from "@/lib/models/Product";
import mongoose from "mongoose";

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export const GET = async () => {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
};
