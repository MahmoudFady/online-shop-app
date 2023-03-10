export interface ICart {
  id?: number;
  totalPrice: number;
  totalQuantity: number;
  products: {
    id: number;
    thumbnail: string;
    title: string;
    brand: string;
    price: number;
    discountPercentage: number;
    quantity: number;
  }[];
}
