export interface IProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  itemInCart: number;
  loading: boolean;
}

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  items: ICartProduct[];
  totalPrice: number;
  totalItems: number;
}
