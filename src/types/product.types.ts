export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  _id: string; 
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
};
