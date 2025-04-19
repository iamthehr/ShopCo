import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
};

const ProductCard = ({ data }: ProductCardProps) => {
  console.log(data);
  return (
    <Link
      href={`/shop/product/${data._id}/${data.title.split(" ").join("-")}`}
      className="block border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="bg-gray-100 w-full aspect-square relative">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{data.title}</h3>
        <p className="text-black font-bold text-xl">${data.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
