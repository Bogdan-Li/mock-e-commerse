export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  inventory: number;
  imageUrl: string;
};

export type Review = {
  id: number;
  description: string;
  rating: number;
  productId: number;
  createdAt: string;
  comment: string;
};
