import { NextResponse } from 'next/server';
import Product from '../../../../lib/models/Product';
import mongoose from 'mongoose';

async function connectToDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDB();

    const body = await req.json();

    // Create a new product with the received data
    const newProduct = new Product({
      title: body.title,
      description: body.description,
      price: body.price,
      category: body.category,
      stock: body.stock,
      image: body.image, // Cloudinary image URL
    });

    // Save the product in the database
    const savedProduct = await newProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
